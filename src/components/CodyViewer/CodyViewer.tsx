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
    <Wrapper>
      <CodyContainer backgroundColor={cody.backgroundColor}>
        {cody.products.map((product: IProduct) => {
          const itemPositionAndSize = cody.itemPositionAndSizeMap.get(
            product.id
          );
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
      </CodyContainer>
      <Description>
        <div className="title">다크 데님과 하얀색 스니커즈</div>
        <div className="content">
          다크 데님과 하얀색 스니커즈로 포인트 넘치는 코디 완성!
        </div>
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: -1px 5px 10px 5px #888;
`;

const CodyContainer = styled.div<{ backgroundColor: string }>`
  width: ${CODY_WIDTH}px;
  height: ${CODY_HEIGHT}px;

  position: relative;
  background-color: ${(props) => props.backgroundColor};
`;

const Description = styled.div`
  width: ${CODY_WIDTH}px;
  height: ${120}px;
  background: white;
  color: black;
  padding: 18px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;

  .title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 4px;
  }

  .content {
    font-size: 0.8rem;
  }
`;

export default CodyViewer;
