import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = ({ camera, comp }) => {
  // console.log(camera);
  // console.log(comp);
  return (
    <section className=" relative w-full h-screen mx-auto">
      <div
        className={`${styles.padding} absolute inset-0 top-[120px] max-w-7xl mx-auto flex-row flesx
      item-stsrt mt-5`}
      ></div>
      <ComputersCanvas camera={camera} comp={comp} />
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
