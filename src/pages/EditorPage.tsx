import { useState } from "react";
import styled from "styled-components";
import CodyItem, {
  IEditorItemPositionAndSize,
  initialEditorItemSize,
} from "../components/Editor/CodyItem";
import CodyPicker from "../components/Editor/CodyPicker";
import CodyProduct from "../components/Editor/CodyProduct";
import CodyEditingBox from "../components/Editor/CodyEditingBox";
import { useCodyEditor } from "../hooks/useCodyEditor";
import { IProduct } from "../types/IProduct";

const CodyGenerationPage: React.FC = () => {
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

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <h1>코디를 만들어보아요</h1>
      <button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        EDITING : {isEditing ? "true" : "false"}
      </button>
      <CodyEditingBox />
      <CodyPicker />
      {selectedProducts.map((product) => {
        const itemPositionAndSize: IEditorItemPositionAndSize =
          getItemPositionAndSize(product);
        return (
          <div key={product.id}>
            <span>
              {product.title}
              <br />
              Position: {itemPositionAndSize.x}, {itemPositionAndSize.y}
              <br />
              Size: {itemPositionAndSize.width}, {itemPositionAndSize.height}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default CodyGenerationPage;
