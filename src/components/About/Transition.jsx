import React from "react";
import TextTransition, { presets } from "react-text-transition";

const texts = [
	"“Computers are incredibly fast, accurate, and stupid",
	"humans are incredibly slow, inaccurate and brilliant",
	"together they are powerful beyond imagination!”"
];

function Type() {
	const [index, setIndex] = React.useState(0);

	React.useEffect(() => {
		const intervalId = setInterval(() =>
		  setIndex(index => index + 1),
		  3000 // every 3 seconds
		);
		return () => clearTimeout(intervalId);
	}, []);

	return (
		<h1 className="glowText">
		  <TextTransition springConfig={presets.wobbly}>
			{texts[index % texts.length]}
		  </TextTransition>
		</h1>
	  );
}

export default Type;
