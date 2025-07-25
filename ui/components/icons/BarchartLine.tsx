import { Path, Svg } from "react-native-svg";
import { createIcon } from "../factories/createIcon";

export const [BarchartLine, AnimatedBarchartLine] = createIcon({
  name: "BarchartLine",
  getIcon: (props) => (
    <Svg viewBox="0 0 24 24" fill="none" {...props}>
      <Path 
        d="M2 13H8V21H2V13ZM16 8H22V21H16V8ZM9 3H15V21H9V3ZM4 15V19H6V15H4ZM11 5V19H13V5H11ZM18 10V19H20V10H18Z"  
        fill="currentColor"
      />
    </Svg>
  ),
});

