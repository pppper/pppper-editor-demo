import styled from 'styled-components';

import { CODY_HEIGHT, CODY_WIDTH } from '../../constants';
import { ICody } from '../../hooks/useCodyEditor';
import { IProduct } from '../../types/IProduct';
import CodyViewerItem from './CodyViewerItem';

export interface ICodyViewerProps {
  cody: ICody;
}

const CodyViewer: React.FC<ICodyViewerProps> = (props) => {
  const { cody } = props;

  return (
    <Wrapper backgroundColor={cody.backgroundColor}>
      {cody.products.map((product: IProduct) => {
        const itemPositionAndSize = cody.itemPositionAndSizeMap.get(product.id);
        const zIndex = cody.productsZIndexMap.get(product.id);
        return (
          <CodyViewerItem
            key={product.id}
            product={product}
            itemPositionAndSize={itemPositionAndSize}
            zIndex={zIndex}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ backgroundColor: string }>`
  width: ${CODY_WIDTH}px;
  height: ${CODY_HEIGHT}px;

  position: relative;
  background-color: ${(props) => props.backgroundColor};
`;

export default CodyViewer;
