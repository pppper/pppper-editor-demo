import "./App.css";
import { resolveUrl } from "./utils/resolveUrl";
import { useState, useEffect } from "react";
import axios from "axios";
import CodyGenerationProductItem from "./CodyGenerationProductItem";
import ProductItem from "./ProductItem";
import styled from "styled-components";

export type TProductZIndex = number;

function App() {
  useEffect(() => {
    axios.post("https://api.pppper.com/styles/test_new").then((response) => {
      let rawProducts = response.data.slice(0, 5);

      let productsMap = new Map();
      let productsZIndexMap = new Map();

      for (let rawProduct of rawProducts) {
        productsMap.set(rawProduct.id, rawProduct);
        productsZIndexMap.set(rawProduct.id, 0);
      }

      setProductsMap(productsMap);
      setProductsZIndexMap(productsZIndexMap);
    });
  }, []);

  const [productsMap, setProductsMap] = useState<
    Map<FetchedDataTypes.TProductId, FetchedDataTypes.IProduct>
  >(new Map());
  const [isNothingBeingEdited, setIsNothingBeingEdited] =
    useState<boolean>(true);
  const [productsZIndexMap, setProductsZIndexMap] = useState<
    Map<FetchedDataTypes.TProductId, TProductZIndex>
  >(new Map());
  const [selectedProductIds, setSelectedProducts] = useState<number[]>([]);

  // setters
  const setProductZIndex = (productId: number, zIndex: TProductZIndex) => {
    const nextProductsZIndexMap = new Map(productsZIndexMap);
    nextProductsZIndexMap.set(productId, zIndex);
    setProductsZIndexMap(nextProductsZIndexMap);
  };

  const setProductSelectedStatus = (productId: number, selected: boolean) => {
    const foundProduct = productsMap.get(productId);
    if (!foundProduct) {
      throw new Error("Product Not Found!");
    }

    setSelectedProducts(
      selectedProductIds.filter(
        (currentProductId) => currentProductId !== productId
      )
    );

    if (selected) {
      setSelectedProducts([...selectedProductIds, foundProduct.id]);
      setProductZIndex(productId, getMaxZIndex() + 1);
    }
  };

  // getters
  const isProductSelected = (productId: number) =>
    selectedProductIds.includes(productId);
  const getProductZIndex = (productId: number) =>
    productsZIndexMap.get(productId);
  const getMaxZIndex = () => {
    return Math.max(...Array.from(productsZIndexMap.values()));
  };

  // event handlers
  const handleCodyGenerationProductItemDragStart = (productId) => () => {
    const zIndex = getProductZIndex(productId);
    const maxZIndex = getMaxZIndex();
    // upgrade zIndex
    let nextZIndex;
    if (zIndex < maxZIndex) {
      nextZIndex = maxZIndex + 1;
    } else {
      nextZIndex = zIndex;
    }
    setProductZIndex(productId, nextZIndex);
    console.log(`${zIndex} has been upgraded`);
    setIsNothingBeingEdited(false);
  };

  const handleCodyGenerationProductItemDelete = (productId) => () => {
    setProductSelectedStatus(productId, false);
  };

  const handleCodyContainerBackgroundClick = () => {
    setIsNothingBeingEdited(true);
  };

  return (
    <Wrapper className="App">
      <h1>코디를 만들어보아요</h1>
      <CodyContainer onClick={handleCodyContainerBackgroundClick}>
        {selectedProductIds.map((productId) => {
          const zIndex = getProductZIndex(productId);
          const maxZIndex = getMaxZIndex();
          const imgUrl =
            productsMap.get(productId)?.style_image.url ||
            productsMap.get(productId)?.image.url;
          return (
            <CodyGenerationProductItem
              key={productId}
              imageSrc={resolveUrl(imgUrl)}
              zIndex={zIndex}
              isActive={!isNothingBeingEdited && maxZIndex === zIndex}
              onDelete={handleCodyGenerationProductItemDelete(productId)}
              onDragStart={handleCodyGenerationProductItemDragStart(productId)}
            ></CodyGenerationProductItem>
          );
        })}
      </CodyContainer>
      <ProductScrollView>
        {Array.from(productsMap.keys()).map((productId) => {
          const selected = isProductSelected(productId);
          return (
            <ProductItem
              key={productId}
              product={productsMap.get(productId)}
              onClick={() => setProductSelectedStatus(productId, !selected)}
              selected={selected}
            />
          );
        })}
      </ProductScrollView>
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
const CodyContainer = styled.div`
  // border: 1px solid black;

  width: 350px;
  height: 400px;
  border-radius: 8px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.17);
`;

const ProductScrollView = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  overflow-x: scroll;
`;

export default App;
