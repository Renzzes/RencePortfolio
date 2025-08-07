import { motion } from "framer-motion";
import React from "react";
import { Tilt } from "react-tilt";
import { RiBriefcase4Fill } from "react-icons/ri";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ title, description, index }) => {
  const cardRef = React.useRef(null);
   const borderColors = [
     { from: '#ff0055', to: '#ff0055' }, // Red
     { from: '#ffaa00', to: '#ffaa00' }, // Gold
     { from: '#00ffff', to: '#00ffff' }  // Cyan
   ];
   const color = borderColors[index % 3];

   React.useEffect(() => {
     const card = cardRef.current;
     if (!card) return;

     const keyframes = `
       @keyframes border-dance-${index} {
         0% { background-position: 0% 0%; }
         12.5% { background-position: 100% 0%; }
         25% { background-position: 100% 0%; }
         37.5% { background-position: 100% 100%; }
         50% { background-position: 100% 100%; }
         62.5% { background-position: 0% 100%; }
         75% { background-position: 0% 100%; }
         87.5% { background-position: 0% 0%; }
         100% { background-position: 0% 0%; }
       }
     `;

     const styleSheet = document.createElement('style');
     styleSheet.textContent = keyframes;
     document.head.appendChild(styleSheet);

     return () => {
       document.head.removeChild(styleSheet);
     };
   }, [index]);

  return (
    <motion.div 
      ref={cardRef}
      className="flex-none w-72 relative overflow-hidden group"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" 
        style={{ 
          background: `linear-gradient(90deg, transparent 0%, ${color.from} 15%, ${color.from} 85%, transparent 100%)`,
            backgroundSize: '400% 400%',
            animation: `border-dance-${index} 8s linear infinite`,
            padding: '2px'
        }}
      >
        <div className="h-full w-full bg-[#0a0a0a] rounded-lg relative p-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div style={{ color: color.from }} className="text-3xl mb-2">
              {title}
            </div>
            <p className="text-gray-400 text-center text-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-lg bg-[#0a0a0a] p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-white text-3xl mb-2">
            {title}
          </div>
          <p className="text-gray-400 text-center text-sm">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a Clarence Emmanuel Jamora. A Full Stack Web developer with experience in
        HTML, CSS, and JavaScript, and expertise in frameworks like React, and
        Bootstrap. I;m passionate about creating reliable, scalable, and user-foucsed digital solutions. 
        In addition to web development, I have practical experience during internship in maintaining and troubleshooting
        computer hardware and systems. I'm always eager to collaborate and turn meaningful ideas into reality.
      </motion.p>
      <button
        className="mt-10 px-6 py-3 text-white bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-md shadow-md hover:bg-gradient-to-r hover:from-cyan-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        onClick={() =>
          window.open(
            "https://drive.google.com/file/d/1JEn1S6Asoi8E_iYSuFiBsiTv2-pWXdVH/view?usp=sharing",
            "_blank"
          )
        }
      >
        <span className="font-semibold flex gap-1.5 items-center"><RiBriefcase4Fill />Download Resume</span>
      </button>
      <div className="mt-12 w-full overflow-hidden">
        <motion.div 
          className="flex gap-6"
          animate={{
            x: ["-50%", "0%"],
          }}
          transition={{
            x: {
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            },
          }}
        >
          {[...services, ...services, ...services].map((service, index) => (
            <ServiceCard key={`${service.title}-${index}`} {...service} index={index} />
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
