import { createGlobalStyle } from "styled-components";

function App() {
  return (
    <>
      <GlobalStyle />
      초기세팅
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
