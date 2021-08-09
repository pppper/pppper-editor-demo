import styled from "styled-components";
import { Rnd } from "react-rnd";
import { TProductZIndex } from "../../App";
import { resolveUrl } from "../../utils/resolveUrl";

export interface ProductItemProps {
  imageSrc: string;
  isActive: boolean;
  onDelete?: any;
  onDrag?: any;
  onFocus?: any;
  onResize?: any;
  zIndex?: TProductZIndex;
}

export type IEditorItemPositionAndSize = IEditorItemPosition & IEditorItemSize;

export interface IEditorItemPosition {
  x: number;
  y: number;
}

export interface IEditorItemSize {
  width: number;
  height: number;
}

// initial position
export const initialEditorItemPosition: IEditorItemPosition = {
  x: 20,
  y: 20,
};

export const initialEditorItemSize: IEditorItemSize = {
  width: 100,
  height: 120,
};

const CodyItem: React.FC<ProductItemProps> = (props) => {
  const {
    imageSrc,
    isActive,
    onDelete: handleDeleteButtonClick,
    onDrag: handleDrag,
    onFocus: handleDragStart,
    onResize: handleResize,
    zIndex,
  } = props;

  return (
    <Rnd
      default={{
        ...initialEditorItemPosition,
        ...initialEditorItemSize,
      }}
      lockAspectRatio
      dragAxis="both"
      bounds="parent"
      style={{
        zIndex: zIndex || 0,
      }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onResize={handleResize}
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
        onClick={handleDeleteButtonClick}
        show={isActive}
        style={{ zIndex: zIndex + 1 }}
      />
    </Rnd>
  );
};

const ProductImage = styled.img<{ showBorders: boolean }>`
  width: 100%;
  height: 100%;
  border: 5px solid;
  border-color: ${(props) => (props.showBorders ? "#ddd" : "transparent")};
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

export default CodyItem;
