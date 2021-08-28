import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const GlobalStyle = createGlobalStyle`

  html, body {
    font-family: Roboto, sans-serif;
    font-size: 17px;
    line-height: 1.5;
  }

  * {
    box-sizing: border-box;
  }
`
