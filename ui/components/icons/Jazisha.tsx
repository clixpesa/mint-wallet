import { Path, Svg } from "react-native-svg";
import { createIcon } from "../factories/createIcon";

export const [Jazisha, AnimatedJazisha] = createIcon({
	name: "Jazisha",
	getIcon: (props) => (
		<Svg viewBox="0 0 24 24" fill="none" {...props}>
			<Path
				d="M21.5 9C21.5 11.7039 19.849 14.0223 17.5 15.0018L17.5 15C17.5 10.3056 13.6944 6.5 9.00001 6.5L8.99817 6.5C9.97773 4.15105 12.2961 2.5 15 2.5C18.5899 2.5 21.5 5.41015 21.5 9ZM7 3C4.79086 3 3 4.79086 3 7V8.5H5V7C5 5.89543 5.89543 5 7 5H8.5V3H7ZM19 15.5V17C19 18.1046 18.1046 19 17 19H15.5V21H17C19.2091 21 21 19.2091 21 17V15.5H19ZM9 21.5C12.5899 21.5 15.5 18.5899 15.5 15C15.5 11.4101 12.5899 8.5 9 8.5C5.41015 8.5 2.5 11.4101 2.5 15C2.5 18.5899 5.41015 21.5 9 21.5ZM9 12.5L11.5 15L9 17.5L6.5 15L9 12.5Z"
				fill="currentColor"
			/>
		</Svg>
	),
});
