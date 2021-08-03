import React from "react";
import "./App.css";
import styled from "styled-components";
import CodyGenerationProductItem from "./CodyGenerationProductItem";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { IProduct, TProductId } from "./types/IProduct";
import ProductItem from "./ProductItem";
import { resolveUrl } from "./utils/resolveUrl";

export type TProductZIndex = number;

function App() {
  useEffect(() => {
    axios
      .post("http://api.pppper.com:4455/styles/test_new")
      .then((response) => {
        let rawProducts = response.data.slice(0, 5);
        let productsMap = new Map();
        let productsZIndexMap = new Map();
        for (let rawProduct of rawProducts) {
          productsMap.set(rawProduct.id, rawProduct);
          productsZIndexMap.set(rawProduct.id, 0);
        }

        setProductsMap(productsMap);
        setProductsZIndexMap(productsZIndexMap);
        // console.log(JSON.stringify(response.data[0]));
      });
  }, []);

  const [productsMap, setProductsMap] = useState<Map<TProductId, IProduct>>(
    new Map()
  );
  const [isNothingBeingEdited, setIsNothingBeingEdited] =
    useState<boolean>(true);
  const [productsZIndexMap, setProductsZIndexMap] = useState<
    Map<TProductId, TProductZIndex>
  >(new Map());
  const [selectedProductIds, setSelectedProducts] = useState<number[]>([]);
  const isProductSelected = (productId: number) =>
    selectedProductIds.includes(productId);
  const getProductZIndex = (productId: number) =>
    productsZIndexMap.get(productId);
  const getMaxZIndex = () => {
    return Math.max(...Array.from(productsZIndexMap.values()));
  };
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

  return (
    <Wrapper className="App">
      <h1>코디를 만들어보아요</h1>
      <CodyContainer
        onClick={() => {
          setIsNothingBeingEdited(true);
        }}
      >
        {selectedProductIds.map((productId) => {
          const zIndex = getProductZIndex(productId);
          const maxZIndex = getMaxZIndex();
          return (
            <CodyGenerationProductItem
              key={productId}
              imageSrc={resolveUrl(productsMap.get(productId)?.style_image.url)}
              zIndex={zIndex}
              isEditing={!isNothingBeingEdited && maxZIndex === zIndex}
              onDelete={() => {
                console.log("deleted");
                setProductSelectedStatus(productId, false);
              }}
              onDragStart={() => {
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
              }}
            ></CodyGenerationProductItem>
          );
        })}
      </CodyContainer>
      <ProductScrollView>
        {Array.from(productsMap.keys()).map((productId) => {
          const selected = isProductSelected(productId);
          return (
            <ProductItem
              product={productsMap.get(productId)}
              key={productId}
              onClick={() => {
                setProductSelectedStatus(productId, !selected);
              }}
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
