import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CodyEditingBox from '../components/CodyEditor/CodyEditingBox';
import CodyProductPicker from '../components/CodyEditor/CodyProductPicker';
import { CodyExporter } from '../components/CodyExporter/CodyExporter';
import CodyViewer from '../components/CodyViewer/CodyViewer';
import { ICody, useCodyEditor } from '../hooks/useCodyEditor';
import { IProduct } from '../types/IProduct';
import { resolveUrl } from '../utils/resolveUrl';

const CodyGenerationPage: React.FC = () => {
  useEffect(() => {
    axios
      .get(
        "https://api.pppper.com/items?page=1&pageSize=30&tag_id&category_id&brand_id&select_content"
      )
      .then((response) => {
        const data = response.data.map((product: IProduct) => {
          return {
            ...product,
            image: resolveUrl(product.image),
            style_image: resolveUrl(product.style_image),
          };
        });
        setProducts(data as IProduct[]);
      });
  }, []);

  const { exportCody, setProducts, setBackgroundColor } = useCodyEditor();

  const cody: ICody = exportCody();
  const sampleColors = ["#FFAEBC", "#A0E7E5", "#B4F8C8", "#FBE7C6"];
  const [color, setColor] = useState<string>(
    sampleColors[Math.floor(Math.random() * sampleColors.length)]
  );

  useEffect(() => {
    setBackgroundColor(color);
  }, [color]);

  // console.log(JSON.stringify(serializeCody(), null, 2));

  return (
    <Wrapper>
      <h1>코디를 만들어보아요</h1>
      <input
        onChange={(e) => {
          setColor(e.target.value);
        }}
      ></input>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CodyEditingBox />
        {!cody || <CodyViewer cody={cody}></CodyViewer>}
      </div>
      <CodyProductPicker />
      <CodyExporter />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CodyGenerationPage;
