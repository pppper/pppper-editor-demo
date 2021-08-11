import _ from 'lodash';
import { createContext, useContext, useState } from 'react';

import { TProductZIndex } from '../App';
import {
    IEditorItemPositionAndSize, initialEditorItemPosition, initialEditorItemSize
} from '../components/CodyEditor/CodyEditorItem';
import { IProduct, TProductId } from '../types/IProduct';

export interface ICodyEditorContext {
  deselectProduct;
  exportCody;
  serializeCody;
  focusedItemId;
  focusItem;
  getItemPositionAndSize;
  getMaxZIndex;
  getProductZIndex;
  isProductOnTop;
  isProductSelected;
  products;
  selectedProducts;
  selectProduct;
  setProducts;
  unfocusAllItems;
  unfocusItem;
  updateItemPositionAndSize;
  backgroundColor;
  setBackgroundColor;
}

export const CodyEditorContext = createContext({} as ICodyEditorContext);

export interface ICodyEditorContexProviderProps {
  initialProducts: IProduct[];
}

export const CodyEditorContextProvider = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  let { initialProductsMap, initialProductsZIndexMap } = (() => {
    const initialProductsMap = new Map();
    const initialProductsZIndexMap = new Map();

    for (let product of products) {
      initialProductsMap.set(product.id, product);
      initialProductsZIndexMap.set(product.id, 0);
    }

    return { initialProductsMap, initialProductsZIndexMap };
  })();

  const [backgroundColor, setBackgroundColor] = useState<string>("#fff");
  const [focusedItemId, setFocusedItemId] = useState<TProductZIndex | null>(-1);

  const [productsMap, setProductsMap] =
    useState<Map<TProductId, IProduct>>(initialProductsMap);
  const getProductById = (productId: TProductId): IProduct => {
    return productsMap.get(productId);
  };

  const [productsZIndexMap, setProductsZIndexMap] = useState<
    Map<TProductId, TProductZIndex>
  >(initialProductsZIndexMap);
  const setProductZIndex = (product: IProduct, zIndex: TProductZIndex) => {
    const nextProductsZIndexMap = _.clone(productsZIndexMap);
    nextProductsZIndexMap.set(product.id, zIndex);
    setProductsZIndexMap(nextProductsZIndexMap);
  };
  const getProductZIndex = (product: IProduct) =>
    productsZIndexMap.get(product.id);

  const [itemPositionAndSizeMap, setItemPositionAndSizeMap] = useState<
    Map<TProductId, IEditorItemPositionAndSize>
  >(new Map());
  const updateItemPositionAndSize = (
    product: IProduct,
    itemPositionAndSize: IEditorItemPositionAndSize
  ) => {
    const nextItemPositionAndSizeMap = new Map(itemPositionAndSizeMap);
    nextItemPositionAndSizeMap.set(product.id, itemPositionAndSize);
    setItemPositionAndSizeMap(nextItemPositionAndSizeMap);
  }; // todo
  const getItemPositionAndSize = (product: IProduct) =>
    itemPositionAndSizeMap.get(product.id);
  const clearItemPositionAndSize = (product: IProduct) => {
    const nextItemPositionAndSizeMap = new Map(itemPositionAndSizeMap);
    nextItemPositionAndSizeMap.delete(product.id);
    setItemPositionAndSizeMap(nextItemPositionAndSizeMap);
  };

  const [selectedProductIdSet, setSelectedProductIdSet] = useState<Set<number>>(
    new Set()
  );

  const selectProduct = (product: IProduct) => {
    const nextSelectedProductIdSet = new Set(selectedProductIdSet);
    nextSelectedProductIdSet.add(product.id);
    setSelectedProductIdSet(nextSelectedProductIdSet);
    setProductZIndex(product, getMaxZIndex() + 1);
    updateItemPositionAndSize(product, {
      ...initialEditorItemPosition,
      ...initialEditorItemSize,
    });
  };

  const deselectProduct = (product: IProduct) => {
    const nextSelectedProductIdSet = new Set(selectedProductIdSet);
    nextSelectedProductIdSet.delete(product.id);
    setSelectedProductIdSet(nextSelectedProductIdSet);
    clearItemPositionAndSize(product);
  };

  const isProductSelected = (product: IProduct) =>
    selectedProductIdSet.has(product.id);

  const getMaxZIndex = () => {
    return Math.max(...Array.from(productsZIndexMap.values()), 0);
  };

  const isProductOnTop = (product: IProduct) =>
    getMaxZIndex() === getProductZIndex(product);

  // event handlers
  const focusItem = (product: IProduct) => {
    const zIndex = getProductZIndex(product);
    const maxZIndex = getMaxZIndex();
    // upgrade zIndex
    let nextZIndex;
    if (zIndex < maxZIndex) {
      nextZIndex = maxZIndex + 1;
    } else {
      nextZIndex = zIndex;
    }
    setProductZIndex(product, nextZIndex);
    setFocusedItemId(product.id);
  };

  const unfocusItem = (product: IProduct) => {};
  const unfocusAllItems = () => {
    setFocusedItemId(-1);
  };
  const selectedProducts = products.filter((product) =>
    isProductSelected(product)
  );

  const exportCody = (): ICody => {
    return {
      products: selectedProducts,
      productsZIndexMap: productsZIndexMap,
      itemPositionAndSizeMap: itemPositionAndSizeMap,
      backgroundColor,
    };
  };

  const serializeCody = (): ISerializedCody => {
    return {
      products: selectedProducts,
      productsZIndex: Object.fromEntries(productsZIndexMap),
      itemPositionAndSize: Object.fromEntries(itemPositionAndSizeMap),
      backgroundColor,
    };
  };

  const context: ICodyEditorContext = {
    deselectProduct,
    exportCody,
    serializeCody,
    focusedItemId,
    focusItem,
    getItemPositionAndSize,
    getMaxZIndex,
    getProductZIndex,
    isProductOnTop,
    isProductSelected,
    products,
    selectedProducts,
    selectProduct,
    setProducts,
    unfocusAllItems,
    unfocusItem,
    updateItemPositionAndSize,
    backgroundColor,
    setBackgroundColor,
  };

  return (
    <CodyEditorContext.Provider value={context}>
      {children}
    </CodyEditorContext.Provider>
  );
};

export const useCodyEditor = () => {
  return useContext(CodyEditorContext);
};

export interface ICody {
  products: IProduct[];
  productsZIndexMap: Map<TProductId, TProductZIndex>;
  itemPositionAndSizeMap: Map<TProductId, IEditorItemPositionAndSize>;
  backgroundColor?: string;
}

export interface ISerializedCody {
  products: IProduct[];
  productsZIndex: Record<TProductId, TProductZIndex>;
  itemPositionAndSize: Record<TProductId, IEditorItemPositionAndSize>;
  backgroundColor?: string;
}
