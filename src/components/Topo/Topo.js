import { TopoBar } from "./styles"
import { FaMedal } from "react-icons/fa"

function Topo() {
  return (
    <TopoBar>
      Quadro de medalhas <FaMedal color="gold" />
      <FaMedal color="silver" />
      <FaMedal color="#e67300" />
    </TopoBar>
  )
}

export default Topo
