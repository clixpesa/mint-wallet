import { Svg, Circle as _Circle } from "react-native-svg";
import { createIcon } from "../factories/createIcon";

export const [EmptySpinner, AnimatedEmptySpinner] = createIcon({
	name: "EmptySpinner",
	getIcon: (props) => (
		<Svg viewBox="0 0 20 20" fill="none" {...props}>
			<_Circle
				cx="10"
				cy="10"
				r="8"
				stroke="currentColor"
				strokeOpacity="0.24"
				strokeWidth="3"
			/>
		</Svg>
	),
});
