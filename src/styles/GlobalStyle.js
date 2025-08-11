import { createGlobalStyle } from "styled-components";
import "@fontsource/raleway";
const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Raleway", sans-serif;
        font-style: normal;
        font-weight: 400;
    }
    button {
        outline: none;
        border: none;
        border-radius: 5px;
        background-color: #49bb07ff;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        cursor: pointer;
        width: calc(100% - 30px);
        padding: 12px;        
    }
    h1 {
        font-weight: 700;
        font-size: 26px;
        color: white;
    }
    h2 {
        font-weight: 400;
        font-size: 20px;
        color: #868686;
    }
    input {
        font-size: 20px;
        width: calc(100% - 30px);
        border-radius: 5px;
        outline: none;
        border: 1px solid #ccc;
        padding: 15px;
        margin: 1px;
        :focus {
            border: 2px solid #ffb6b6;
            margin: 0px;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 15px;
        width: 100%;
        border-radius: 5px;
    }
    a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        color: white;
        text-decoration: none;
        padding-top: 30px;
    }
`

export default GlobalStyle