import "./App.css";
import { IProduct, TProductId } from "./types/IProduct";
import axios from "axios";
import CodyItem, { initialEditorItemSize } from "./components/Editor/CodyItem";
import CodyProduct from "./components/Editor/ProductItem";
import styled from "styled-components";
import { useCodyEditor } from "./hooks/useCodyEditor";

export type TProductZIndex = number;

function App() {
  const {
    deselectProduct,
    getProductZIndex,
    handleItemFocus,
    isEditing,
    handleUnfocusAll,
    isProductOnTop,
    isProductSelected,
    products,
    selectedProducts,
    selectProduct,
    updateItemPositionAndSize,
    getItemPositionAndSize,
  } = useCodyEditor();

  const handleCodyViewerClick = () => {
    handleUnfocusAll();
  };

  return (
    <Wrapper className="App">
      <h1>코디를 만들어보아요</h1>
      <CodyViewer onClick={handleCodyViewerClick}>
        {selectedProducts.map((product: IProduct) => (
          <CodyItem
            key={product.id}
            imageSrc={product.style_image.url || product.image.url}
            zIndex={getProductZIndex(product)}
            isActive={isEditing && isProductOnTop(product)}
            onDelete={() => deselectProduct(product)}
            onFocus={() => handleItemFocus(product)}
            onDrag={(_, data) => {
              const itemPositionAndSize = getItemPositionAndSize(product);
              updateItemPositionAndSize(product, {
                ...itemPositionAndSize,
                x: data.x,
                y: data.y,
              });
            }}
            onResize={(e, dir, refToElement, delta, position) => {
              updateItemPositionAndSize(product, {
                x: position.x,
                y: position.y,
                width: initialEditorItemSize.width + delta.width,
                height: initialEditorItemSize.width + delta.height,
              });
            }}
          ></CodyItem>
        ))}
      </CodyViewer>
      <CodyPicker>
        {products.map((product: IProduct) => {
          const selected = isProductSelected(product);
          return (
            <CodyProduct
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
      </CodyPicker>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 400px;
`;

const CodyViewer = styled.div`
  width: 350px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.17);
`;

const CodyPicker = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  overflow-x: scroll;
`;

export default App;
