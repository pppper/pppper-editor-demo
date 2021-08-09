import { createContext, useState } from "react";
import { TProductZIndex } from "../App";
import { IProduct, TProductId } from "../types/IProduct";
import _ from "lodash";
import {
  IEditorItemPositionAndSize,
  initialEditorItemPosition,
  initialEditorItemSize,
} from "../components/Editor/CodyItem";

const initialProducts: IProduct[] = [
  {
    id: 123123,
    title: "옷가지1",
    image: {
      url: "https://picsum.photos/200/250",
    },
    style_image: {
      url: "https://picsum.photos/200/250",
    },
  },
  {
    id: 123124,
    title: "옷가지2",
    image: {
      url: "https://picsum.photos/200/250",
    },
    style_image: {
      url: "https://picsum.photos/200/250",
    },
  },
  {
    id: 123125,
    title: "옷가지2",
    image: {
      url: "https://picsum.photos/200/250",
    },
    style_image: {
      url: "https://picsum.photos/200/250",
    },
  },
];

export const useCodyEditor = () => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);

  let { initialProductsMap, initialProductsZIndexMap } = (() => {
    const initialProductsMap = new Map();
    const initialProductsZIndexMap = new Map();

    for (let product of products) {
      initialProductsMap.set(product.id, product);
      initialProductsZIndexMap.set(product.id, 0);
    }

    return { initialProductsMap, initialProductsZIndexMap };
  })();

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
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    return Math.max(...Array.from(productsZIndexMap.values()));
  };

  const isProductOnTop = (product: IProduct) =>
    getMaxZIndex() === getProductZIndex(product);

  // event handlers
  const handleItemFocus = (product: IProduct) => {
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
    setIsEditing(true);
  };

  const handleUnfocusAll = () => {
    setIsEditing(false);
  };

  const selectedProducts = products.filter((product) =>
    isProductSelected(product)
  );

  return {
    deselectProduct,
    getItemPositionAndSize,
    getMaxZIndex,
    getProductZIndex,
    handleItemFocus,
    handleUnfocusAll,
    isEditing,
    isProductOnTop,
    isProductSelected,
    products,
    selectedProducts,
    selectProduct,
    setProducts,
    updateItemPositionAndSize,
  };
};
