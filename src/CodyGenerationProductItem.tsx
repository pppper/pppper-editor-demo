import styled from "styled-components";
import { Rnd } from "react-rnd";
import { TProductZIndex } from "./App";
import { resolveUrl } from "./utils/resolveUrl";

export interface ProductItemProps {
  imageSrc: string;
  onDelete?: any;
  zIndex?: TProductZIndex;
  onDragStart?: any;
  isActive: boolean;
}

const CodyGenerationProductItem: React.FC<ProductItemProps> = (props) => {
  const { imageSrc, zIndex, onDragStart, onDelete, isActive } = props;

  return (
    <Rnd
      default={{
        x: 20,
        y: 20,
        width: 100,
        height: 120,
      }}
      lockAspectRatio
      dragAxis="both"
      bounds="parent"
      style={{
        zIndex: zIndex || 0,
      }}
      onDragStart={(event) => {
        onDragStart(event);
      }}
      allowAnyClick
      dragHandleClassName="dragme"
      resizeHandleComponent={{
        right: null,
      }}
    >
      <ProductImage
        showBorders={isActive}
        src={imageSrc}
        draggable={false}
        alt="https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
        className="dragme"
      ></ProductImage>
      <ResizeButton className="resizeme" show={isActive} />
      <DeleteButton
        onClick={onDelete}
        show={isActive}
        style={{ zIndex: zIndex + 1 }}
      />
    </Rnd>
  );
};

const ProductImage = styled.img<{ showBorders: boolean }>`
  width: 100%;
  height: 100%;
  ${(props) => (props.showBorders ? "border: 1px solid #ddd" : "border:none")};
`;

const DeleteButton = styled.div<{ show: boolean }>`
  position: absolute;
  right: -7.5px;
  top: -7.5px;
  width: 15px;
  height: 15px;
  background-size: contain;
  background-image: url(${resolveUrl("/image/close_btn.png")});
  opacity: ${(props) => (props.show ? 1 : 0)};
`;
const ResizeButton = styled.div<{ show: boolean }>`
  position: absolute;
  right: -7.5px;
  bottom: -7.5px;
  width: 15px;
  height: 15px;

  background-image: url(${resolveUrl("/image/resize_btn.png")});
  background-size: contain;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

export default CodyGenerationProductItem;
