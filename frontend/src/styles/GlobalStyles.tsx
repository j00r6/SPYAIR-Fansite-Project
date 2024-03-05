import { createGlobalStyle, css } from "styled-components";

const GlobalStyle = createGlobalStyle`
   @media screen and (max-width:1799px) {
    * {
      box-sizing: border-box;
      margin: 0px;
      padding: 0px;
      font-size: 16px;
    }
  }


  @media screen and (max-width:769px) {
  * {
      box-sizing: border-box;
      margin: 0px;
      padding: 0px;
      font-size: 12px;
    }
  }

 
  body {
    font-family: 'Roboto Condensed', sans-serif; 
    background-color: #000000;
    font-weight: 100;
    line-height: 1.5;
    color: #fff;
    word-break: keep-all;
    word-wrap: break-word;
    margin: 0px;
    padding: 0;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smooting: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
 
`;
export const responsiveHeaderStyles = css`
  @media screen and (max-width: 1799px) {
    height: 100px;
  }

  @media screen and (max-width: 768px) {
    height: 70px;
  }
`;

export default GlobalStyle;
