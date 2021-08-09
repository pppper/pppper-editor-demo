import "./App.css";
import styled from "styled-components";
import { CodyEditorContextProvider } from "./hooks/useCodyEditor";
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
