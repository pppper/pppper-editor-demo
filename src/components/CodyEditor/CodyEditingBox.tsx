import styled from "styled-components";
import { CODY_HEIGHT, CODY_WIDTH } from "../../constants";
import { useCodyEditor } from "../../hooks/useCodyEditor";
import { IProduct } from "../../types/IProduct";
import CodyItem, { initialEditorItemSize } from "./CodyItem";

interface ICodyViewerProps {
  isEditing?: boolean;
}

const CodyEditingBox: React.FC<ICodyViewerProps> = (props) => {
  const {
    deselectProduct,
    getItemPositionAndSize,
    getProductZIndex,
    handleItemFocus,
    handleUnfocusAll,
    isAnythingFocused,
    isProductOnTop,
    selectedProducts,
    updateItemPositionAndSize,
  } = useCodyEditor();

  const handleCodyViewerClick = () => {
    handleUnfocusAll();
  };
  return (
    <Wrapper onClick={handleCodyViewerClick}>
      {selectedProducts.map((product: IProduct) => (
        <CodyItem
          key={product.id}
          imageSrc={product.style_image.url || product.image.url}
          zIndex={getProductZIndex(product)}
          isActive={isAnythingFocused && isProductOnTop(product)}
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: ${CODY_WIDTH}px;
  height: ${CODY_HEIGHT}px;
  border-radius: 8px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.17);
`;

export default CodyEditingBox;
