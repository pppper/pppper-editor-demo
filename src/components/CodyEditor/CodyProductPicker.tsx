import styled from 'styled-components';

import { useCodyEditor } from '../../hooks/useCodyEditor';
import { IProduct } from '../../types/IProduct';
import CodyEditorProduct from './CodyEditorProduct';

const CodyProductPicker = () => {
  const { deselectProduct, isProductSelected, products, selectProduct } =
    useCodyEditor();

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

  width: 800px;
  height: 300px;
  overflow-x: scroll;
  overflow-y: hidden;
`;

export default CodyProductPicker;
