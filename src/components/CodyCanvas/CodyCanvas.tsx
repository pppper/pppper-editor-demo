import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { readBuilderProgram } from 'typescript';

import { CODY_HEIGHT, CODY_WIDTH } from '../../constants';
import { ICody, useCodyEditor } from '../../hooks/useCodyEditor';
import { IEditorItemPositionAndSize } from '../CodyEditor/CodyEditorItem';

export interface ICodyExporterProps {
  cody: ICody;
}

const CanvasScaleFactor = 4;

export const CodyCanvas: React.FC<ICodyExporterProps> = (props) => {
  const { selectedProducts } = useCodyEditor();
  const { cody } = props;
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const draw = async (ctx: CanvasRenderingContext2D) => {
    // ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = cody.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    cody.products.sort((p1, p2) => {
      const p1z = cody.productsZIndexMap.get(p1.id);
      const p2z = cody.productsZIndexMap.get(p2.id);
      return p1z - p2z;
    });

    // draw images
    const promises = [];
    for (let product of cody.products) {
      const itemPositionAndSize: IEditorItemPositionAndSize =
        cody.itemPositionAndSizeMap.get(product.id);
      const imgSrc = product.style_image || product.image;
      const { x, y, width, height } = itemPositionAndSize;
      const image = new Image();
      image.src = imgSrc;
      image.crossOrigin = "anonymous";
      const promise = new Promise((resolve, reject) => {
        image.onload = function () {
          ctx.drawImage(
            image,
            x * CanvasScaleFactor,
            y * CanvasScaleFactor,
            width * CanvasScaleFactor,
            height * CanvasScaleFactor
          );
          resolve(1);
        };
      });

      promises.push(promise);
    }

    await Promise.all(promises);
  };

  const drawNow = async () => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D = canvas.getContext("2d");
    await draw(context);
  };

  const exportImage = async () => {
    await drawNow();
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.toBlob(function (blob: Blob) {
      const blobUrl = URL.createObjectURL(blob);
      setDownloadUrl(blobUrl);
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", "image.jpg");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 300);
    }, "image/png");
  };

  const shareImage = () => {
    drawNow();
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.toBlob(function (blob: Blob) {
      const file = new File([blob], "file.png", { type: "image/png" });
      const canShare =
        (navigator as any).canShare &&
        (navigator as any).canShare({ files: [file] });
      alert(canShare);
      if (canShare) {
        navigator.share({
          text: "text",
          title: "title",
          url: "url",
          files: [file],
        } as ShareData);
      }
    }, "image/png");
  };

  useEffect(() => {
    drawNow();
  }, [cody]);
  return (
    <Wrapper>
      <Canvas
        ref={canvasRef}
        width={CODY_WIDTH * CanvasScaleFactor}
        height={CODY_HEIGHT * CanvasScaleFactor}
      ></Canvas>
      <button onClick={exportImage}>download</button>
      <button onClick={shareImage}>share</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${CODY_WIDTH};
  height: ${CODY_HEIGHT};
  display: flex;
  flex-direction: column;
`;

const Canvas = styled.canvas`
  width: ${CODY_WIDTH};
  height: ${CODY_HEIGHT};
  display: none;
`;
