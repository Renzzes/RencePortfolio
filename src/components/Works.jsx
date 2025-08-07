import { motion } from "framer-motion";
import React from "react";
import { Tilt } from "react-tilt";

import { github } from "../assets";
import { projects } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const words = [
  { text: "Ideas", imgPath: "/assets/badge/ideas.svg", font: "Poppins" },
  { text: "Concepts", imgPath: "/assets/badge/concepts.svg", font: "Roboto" },
  { text: "Designs", imgPath: "/assets/badge/designs.svg", font: "Montserrat" },
  { text: "Code", imgPath: "/assets/badge/code.svg", font: "Source Code Pro" }
];

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  images,
  source_code_link,
  live_demo_link,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-[#111522] p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[200px] overflow-hidden">
          <motion.img
            key={currentImageIndex}
            src={images[currentImageIndex]}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          <div className="absolute inset-0 flex justify-end m-3 gap-2">
            <div
              onClick={() => window.open(live_demo_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </div>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-2 gap-1">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
                onClick={() => setCurrentImageIndex(idx)}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <div>
        <motion.div variants={textVariant()}>
          <p className={`${styles.sectionSubText} `}>My work</p>
          <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
        </motion.div>
        <div className="hero-text">
          <motion.span
            variants={fadeIn("", "", 0.1, 1)}
            className="mt-3 text-secondary text-[30px] max-w-3xl leading-[50px]"
          >
            <h1>
              Shaping
              <span className="slide pl-3">
                <span className="wrapper">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className="flex items-center text-3xl md:gap-3 gap-1 pb-2"
                    >
                      <img
                        src={word.imgPath}
                        alt="person"
                        className=" md:p-2 p-1 rounded-full bg-[#8ec5ff]"
                      />
                      <span 
                        className="font-extrabold text-white" 
                        style={{ 
                          fontFamily: word.font, 
                          textShadow: '0 0 4px #8ec5ff, 0 0 6px white' 
                        }}
                      >
                        {word.text}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1>into Real Projects that Deliver Results</h1>
          </motion.span>
        </div>

        <div className="mt-20 flex flex-wrap gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");