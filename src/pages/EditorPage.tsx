import { useState } from "react";
import styled from "styled-components";
import CodyEditorItem, {
  IEditorItemPositionAndSize,
  initialEditorItemSize,
} from "../components/CodyEditor/CodyEditorItem";
import CodyProductPicker from "../components/CodyEditor/CodyProductPicker";
import CodyEditorProduct from "../components/CodyEditor/CodyEditorProduct";
import CodyEditingBox from "../components/CodyEditor/CodyEditingBox";
import { ICody, useCodyEditor } from "../hooks/useCodyEditor";
import { IProduct } from "../types/IProduct";
import CodyViewer from "../components/CodyViewer/CodyViewer";
import { useEffect } from "react";
import axios from "axios";
import { resolveUrl } from "../utils/resolveUrl";

const CodyGenerationPage: React.FC = () => {
  useEffect(() => {
    axios.post("https://api.pppper.com/styles/test_new").then((response) => {
      const data = response.data.map((product: IProduct) => {
        return {
          ...product,
          image: { ...product.image, url: resolveUrl(product.image.url) },
          style_image: { ...product.style_image, url: resolveUrl(product.style_image.url) },
        };
      });
      setProducts(data as IProduct[]);
    });
  }, []);

  const {
    deselectProduct,
    exportCody,
    getItemPositionAndSize,
    getProductZIndex,
    handleItemFocus,
    handleUnfocusAll,
    isAnythingFocused,
    isProductOnTop,
    isProductSelected,
    products,
    selectedProducts,
    selectProduct,
    setProducts,
    updateItemPositionAndSize,
  } = useCodyEditor();

  const cody: ICody = exportCody();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Wrapper>
      <h1>코디를 만들어보아요</h1>
      <button
        onClick={() => {
          setIsEditing(!isEditing);
        }}
      >
        EDITING : {isEditing ? "true" : "false"}
      </button>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CodyEditingBox />
        {!cody || <CodyViewer cody={cody}></CodyViewer>}
      </div>
      <CodyProductPicker />
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
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CodyGenerationPage;
