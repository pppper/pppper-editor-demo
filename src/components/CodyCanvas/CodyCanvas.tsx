import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { readBuilderProgram } from 'typescript';

import { CODY_HEIGHT, CODY_WIDTH } from '../../constants';
import { ICody, useCodyEditor } from '../../hooks/useCodyEditor';
import { IEditorItemPositionAndSize } from '../CodyEditor/CodyEditorItem';

export interface ICodyExporterProps {
  cody: ICody;
}

const CanvasScaleFactor = 3;

export const CodyCanvas: React.FC<ICodyExporterProps> = (props) => {
  const { selectedProducts } = useCodyEditor();
  const { cody } = props;
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const draw = (ctx: CanvasRenderingContext2D) => {
    // ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = cody.backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    cody.products.sort((p1, p2) => {
      const p1z = cody.productsZIndexMap.get(p1.id);
      const p2z = cody.productsZIndexMap.get(p2.id);
      return p1z - p2z;
    });

    // draw images
    for (let product of cody.products) {
      const itemPositionAndSize: IEditorItemPositionAndSize =
        cody.itemPositionAndSizeMap.get(product.id);
      const imgSrc = product.style_image || product.image;
      const { x, y, width, height } = itemPositionAndSize;
      const image = new Image();
      image.src = imgSrc;
      image.crossOrigin = "anonymous";
      ctx.drawImage(
        image,
        x * CanvasScaleFactor,
        y * CanvasScaleFactor,
        width * CanvasScaleFactor,
        height * CanvasScaleFactor
      );
    }
  };

  const drawNow = () => {
    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D = canvas.getContext("2d");
    draw(context);
  };

  const exportImage = () => {
    drawNow();
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.toBlob(function (blob: Blob) {
      const blobUrl = URL.createObjectURL(blob);
      setDownloadUrl(blobUrl);
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
      <a href={downloadUrl}>Download</a>
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
`;
