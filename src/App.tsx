import "./App.css";
import { IProduct, TProductId } from "./types/IProduct";
import axios from "axios";
import CodyEditorItem, {
  initialEditorItemSize,
} from "./components/CodyEditor/CodyEditorItem";
import CodyEditorProduct from "./components/CodyEditor/CodyEditorProduct";
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

const Wrapper = styled.div``;

export default App;
