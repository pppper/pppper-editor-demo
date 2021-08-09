import styled from "styled-components";
import { CODY_HEIGHT, CODY_WIDTH } from "../../constants";
import { ICody } from "../../hooks/useCodyEditor";
import { IProduct } from "../../types/IProduct";
import CodyViewerItem from "./CodyViewerItem";

export interface ICodyViewerProps {
  cody: ICody;
}

const CodyViewer: React.FC<ICodyViewerProps> = (props) => {
  const { cody } = props;
  return (
    <div>
      {cody.products.map((product: IProduct) => {
        return <CodyViewerItem>{product.title}</CodyViewerItem>;
      })}
    </div>
  );
};

const Wrapper = styled.div`
  width: ${CODY_WIDTH}px;
  height: ${CODY_HEIGHT}px;

  position: relative;
`;

export default CodyViewer;
