import styled from "styled-components";
import { TProductZIndex } from "../../App";
import { IProduct } from "../../types/IProduct";
import { IEditorItemPositionAndSize } from "../CodyEditor/CodyEditorItem";

interface ICodyViewerItemProps {
  product?: IProduct;
  itemPositionAndSize: IEditorItemPositionAndSize;
  zIndex: TProductZIndex;
}

const CodyViewerItem: React.FC<ICodyViewerItemProps> = (props) => {
  const { product, itemPositionAndSize, zIndex } = props;
  return (
    <Wrapper itemPositionAndSize={itemPositionAndSize} zIndex={zIndex}>
      <CodyImage
        src={product.style_image || product.image}
        itemPositionAndSize={itemPositionAndSize}
      ></CodyImage>
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  itemPositionAndSize: IEditorItemPositionAndSize;
  zIndex: TProductZIndex;
}>`
  position: absolute;
  width: ${(props) => props.itemPositionAndSize.width}px;
  height: ${(props) => props.itemPositionAndSize.height}px;
  z-index: ${(props) => props.zIndex};

  left: ${(props) => props.itemPositionAndSize.x}px;
  top: ${(props) => props.itemPositionAndSize.y}px;

  transition: top 0.5s ease-in-out, left 0.5s ease-in-out,
    width 0.5s ease-in-out, height 0.5s ease-in-out;
  /* transition: width, height 0.3s ease; */
`;

const CodyImage = styled.img<{
  itemPositionAndSize: IEditorItemPositionAndSize;
}>`
  object-fit: contain;
  width: ${(props) => props.itemPositionAndSize.width}px;
  height: ${(props) => props.itemPositionAndSize.height}px;

  transition: top 0.5s ease-in-out, left 0.5s ease-in-out,
    width 0.5s ease-in-out, height 0.5s ease-in-out;
`;

export default CodyViewerItem;
