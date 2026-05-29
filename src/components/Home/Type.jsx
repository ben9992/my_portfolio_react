import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
	return (
		<Typewriter
			options={{
				strings: [
					"VP R&D",
					"Computer Engineer",
					"FullStack Developer",
					"Technologies Explorer",
				],
				autoStart: true,
				loop: true,
				deleteSpeed: 60,
			}}
		/>
	);
}

export default Type;
