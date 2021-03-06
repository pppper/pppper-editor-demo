import { Rnd } from 'react-rnd';
import styled from 'styled-components';

import { TProductZIndex } from '../../App';
import { useCodyEditor } from '../../hooks/useCodyEditor';
import { IProduct } from '../../types/IProduct';

export interface ProductItemProps {
  isFocused: boolean;
  onDelete?: any;
  onResizeStop?: any;
  onDragStop?: any;
  onResize?: any;
  zIndex?: TProductZIndex;
  product: IProduct;
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

const CodyEditorItem: React.FC<ProductItemProps> = (props) => {
  const {
    product,
    isFocused,
    onDelete: handleDeleteButtonClick,
    onDragStop: handleDragStop,
    // onDragStart: handleDragStart,
    onResizeStop: handleResizeStop,
    zIndex,
  } = props;

  const { focusItem } = useCodyEditor();
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      allowAnyClick
      dragHandleClassName="dragme"
      resizeHandleComponent={{
        right: null,
      }}
      onDragStart={() => {
        focusItem(product);
      }}
    >
      <ProductImage
        showBorders={isFocused}
        src={product.style_image || product.image}
        draggable={false}
        alt="https://image.shutterstock.com/image-vector/no-image-available-vector-illustration-260nw-744886198.jpg"
        className="dragme"
      ></ProductImage>
      <ResizeButton className="resizeme" show={isFocused} />
      <DeleteButton
        onClick={handleDeleteButtonClick}
        show={isFocused}
        style={{ zIndex: zIndex + 1 }}
      />
    </Rnd>
  );
};

const ProductImage = styled.img<{
  showBorders: boolean;
}>`
  width: 100%;
  /* height: 100%; */
  /* height: ${initialEditorItemSize.height}; */
  /* border: -1px solid;
  border-color: ${(props) => (props.showBorders ? "#ddd" : "transparent")}; */
`;

const DeleteButton = styled.div<{ show: boolean }>`
  position: absolute;
  right: -7.5px;
  top: -7.5px;
  width: 15px;
  height: 15px;
  background-size: contain;
  background-image: url("https://api.pppper.com/image/close_btn.png");
  opacity: ${(props) => (props.show ? 1 : 0)};
`;
const ResizeButton = styled.div<{ show: boolean }>`
  position: absolute;
  right: -7.5px;
  bottom: -7.5px;
  width: 15px;
  height: 15px;

  background-image: url("https://api.pppper.com/image/resize_btn.png");
  background-size: contain;
  opacity: ${(props) => (props.show ? 1 : 0)};
`;

export default CodyEditorItem;
