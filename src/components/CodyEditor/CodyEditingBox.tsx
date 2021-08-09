import styled from "styled-components";
import { CODY_HEIGHT, CODY_WIDTH } from "../../constants";
import { useCodyEditor } from "../../hooks/useCodyEditor";
import { IProduct } from "../../types/IProduct";
import CodyEditorItem from "./CodyEditorItem";

interface ICodyViewerProps {
  isEditing?: boolean;
}

const CodyEditingBox: React.FC<ICodyViewerProps> = (props) => {
  const {
    deselectProduct,
    getItemPositionAndSize,
    getProductZIndex,
    selectedProducts,
    updateItemPositionAndSize,
    unfocusAllItems,
    focusedItemId,
    backgroundColor,
  } = useCodyEditor();

  const handleCodyViewerClick = () => {
    unfocusAllItems();
  };

  return (
    <Wrapper onClick={handleCodyViewerClick} backgroundColor={backgroundColor}>
      {selectedProducts.map((product: IProduct) => (
        <CodyEditorItem
          key={product.id}
          product={product}
          zIndex={getProductZIndex(product)}
          isFocused={focusedItemId === product.id}
          onDelete={() => deselectProduct(product)}
          onDragStop={(_, data) => {
            const itemPositionAndSize = getItemPositionAndSize(product);
            updateItemPositionAndSize(product, {
              ...itemPositionAndSize,
              x: data.x,
              y: data.y,
            });
          }}
          onResizeStop={(e, dir, refToElement, delta, position) => {
            updateItemPositionAndSize(product, {
              x: position.x,
              y: position.y,
              width: refToElement.offsetWidth,
              height: refToElement.offsetHeight,
            });
          }}
        ></CodyEditorItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ backgroundColor: string }>`
  width: ${CODY_WIDTH}px;
  height: ${CODY_HEIGHT}px;
  border-radius: 8px;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.17);
  background-color: ${(props) => props.backgroundColor};
`;

export default CodyEditingBox;
