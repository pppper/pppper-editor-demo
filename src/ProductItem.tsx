import { MouseEventHandler } from "react";
import styled from "styled-components";
import { resolveUrl } from "./utils/resolveUrl";

interface ProductItemProps {
  product: FetchedDataTypes.IProduct;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { product, onClick, selected } = props;
  return (
    <Wrapper onClick={onClick}>
      <ProductImage
        selected={selected}
        src={resolveUrl(product.image.url)}
      ></ProductImage>
      <div>{product.title.slice(0, 10)}...</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex-shrink: 0;
  width: 38%;
  padding: 8px;
`;

const ProductImage = styled.img<{ selected: boolean }>`
  border: 4px solid;
  ${(props) => (props.selected ? "border-color: purple" : "border-color: transparent")};
  transition: border-color 0.3s ease-in;
  object-fit: cover;
  width: 100%;
`;

export default ProductItem;
