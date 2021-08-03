import styled from "styled-components";
import { Rnd } from "react-rnd";
import { TProductZIndex } from "./App";
import { resolveUrl } from "./utils/resolveUrl";

export interface ProductItemProps {
  imageSrc: string;
  onDelete?: any;
  zIndex?: TProductZIndex;
  onDragStart?: any;
  isEditing: boolean;
}

const CodyGenerationProductItem: React.FC<ProductItemProps> = (props) => {
  const { imageSrc, zIndex, onDragStart, onDelete, isEditing } = props;
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
    >
      <Wrapper>
        <ProductImage
          isEditing={isEditing}
          src={imageSrc}
          draggable={false}
          alt="상품이미지"
          onClick={(e) => {
            onDelete(e);
          }}
        ></ProductImage>
      </Wrapper>
      <ResizeButton></ResizeButton>
      <DeleteButton
        id="shit"
        style={{ zIndex: zIndex + 1 }}
      ></DeleteButton>
    </Rnd>
  );
};

const Wrapper = styled.div``;

const ProductImage = styled.img<{ isEditing: boolean }>`
  width: 100%;
  height: 100%;
  ${(props) => (props.isEditing ? "border: 1px solid #ddd" : "border:none")};
`;

const DeleteButton = styled.div`
  position: absolute;
  right: -7.5px;
  top: -7.5px;
  width: 15px;
  height: 15px;
  background-size: contain;
  background-image: url(${resolveUrl("/image/close_btn.png")});
`;
const ResizeButton = styled.div`
  position: absolute;
  right: -7.5px;
  bottom: -7.5px;
  width: 15px;
  height: 15px;

  background-image: url(${resolveUrl("/image/resize_btn.png")});
  background-size: contain;
`;

export default CodyGenerationProductItem;
