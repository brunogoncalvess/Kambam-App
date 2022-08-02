import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";

import config from './config'

function ParticlesBackground() {
   const particlesInit = async (main) => {
     await loadFull(main);
   };

   const particlesLoaded = (container) => {
     console.log(container);
   };
  // console.log(config)
  return (
      <Particles 
      id="tsparticles"
      init={particlesInit}
      // loaded={particlesLoaded}
      options={config} />
      
  )
}

export default ParticlesBackground;
