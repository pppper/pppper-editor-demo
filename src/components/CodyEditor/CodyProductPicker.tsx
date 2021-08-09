import styled from "styled-components";
import { useCodyEditor } from "../../hooks/useCodyEditor";
import { IProduct } from "../../types/IProduct";
import CodyEditorProduct from "./CodyEditorProduct";


const CodyProductPicker = () => {
  const {
    deselectProduct,
    getProductZIndex,
    handleItemFocus,
    isAnythingFocused,
    handleUnfocusAll,
    isProductOnTop,
    isProductSelected,
    products,
    selectedProducts,
    selectProduct,
    updateItemPositionAndSize,
    getItemPositionAndSize,
  } = useCodyEditor();

  return (
    <Wrapper>
      {products.map((product: IProduct) => {
        const selected = isProductSelected(product);
        return (
          <CodyEditorProduct
            key={product.id}
            product={product}
            onClick={() => {
              if (selected) {
                deselectProduct(product);
              } else {
                selectProduct(product);
              }
            }}
            selected={selected}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  width: 400px;
  overflow-x: scroll;
`;

export default CodyProductPicker;
