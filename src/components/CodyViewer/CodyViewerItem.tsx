import styled from "styled-components";
import { IProduct } from "../../types/IProduct";
import { IEditorItemPositionAndSize } from "../CodyEditor/CodyEditorItem";

interface ICodyViewerItemProps {
  product?: IProduct;
  itemPositionAndSize: IEditorItemPositionAndSize;
}

const CodyViewerItem: React.FC<ICodyViewerItemProps> = (props) => {
  const { product, itemPositionAndSize } = props;
  return (
    <Wrapper itemPositionAndSize={itemPositionAndSize}>
      <CodyImage
        src={product.style_image.url || product.image.url}
        itemPositionAndSize={itemPositionAndSize}
      ></CodyImage>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ itemPositionAndSize: IEditorItemPositionAndSize }>`
  position: absolute;
  width: ${(props) => props.itemPositionAndSize.width}px;
  height: ${(props) => props.itemPositionAndSize.height}px;

  left: ${(props) => props.itemPositionAndSize.x}px;
  top: ${(props) => props.itemPositionAndSize.y}px;
`;

const CodyImage = styled.img<{
  itemPositionAndSize: IEditorItemPositionAndSize;
}>`
  object-fit: contain;
  width: ${(props) => props.itemPositionAndSize.width}px;
  height: ${(props) => props.itemPositionAndSize.height}px;
`;

export default CodyViewerItem;
