import "./App.css";
import { IProduct, TProductId } from "./types/IProduct";
import axios from "axios";
import CodyItem, { initialEditorItemSize } from "./components/Editor/CodyItem";
import CodyProduct from "./components/Editor/CodyProduct";
import styled from "styled-components";
import {
  CodyEditorContextProvider,
  useCodyEditor,
} from "./hooks/useCodyEditor";
import CodyGenerationPage from "./pages/EditorPage";

export type TProductZIndex = number;

function App() {
  return (
    <Wrapper className="App">
      <CodyEditorContextProvider>
        <CodyGenerationPage></CodyGenerationPage>
      </CodyEditorContextProvider>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 400px;
`;

export default App;
