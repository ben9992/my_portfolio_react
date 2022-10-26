import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Particle = () => {
	const particlesInit = useCallback(async (engine) => {
		console.log(engine);
		// you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(async (container) => {
		await console.log(container);
	}, []);

	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}
			params={{
				particles: {
					number: {
						value: 200,
						density: {
							enable: false,
						},
					},
					size: {
						value: 2.5,
						random: true,
						anim: {
							speed: 4,
							size_min: 0.3,
						},
					},
					line_linked: {
						enable: false,
					},
					move: {
						enable: true,
						random: true,
						speed: 0.9,
						direction: "top",
						out_mode: "out",
					},
				},
				interactivity: {
					events: {
						onhover: {
							enable: true,
							mode: "repulse",
						},
						onclick: {
							enable: true,
							mode: "repulse",
						},
					},
					modes: {
						bubble: {
							distance: 200,
							duration: 2,
							size: 0,
							opacity: 0,
						},
						repulse: {
							distance: 100,
							duration: 4,
						},
					},
				},
			}}
		/>
	);
};

export default Particle;
