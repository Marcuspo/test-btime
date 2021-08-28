import Body from "./components/Body/Body"
import Topo from "./components/Topo/Topo"

import { Container, GlobalStyle } from "./styles"

function App() {
  return (
    <Container>
      <Topo />
      <Body />
      <GlobalStyle />
    </Container>
  )
}

export default App
