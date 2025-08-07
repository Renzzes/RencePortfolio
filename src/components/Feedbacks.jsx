import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-[#0f0f0f] p-10 rounded-3xl xs:w-[320px] w-full relative group"
    whileHover={{ 
      scale: 1.02,
      boxShadow: "0 8px 32px -8px rgba(142, 197, 255, 0.3)"
    }}
    transition={{ 
      type: "spring",
      stiffness: 300,
      damping: 20
    }}
  >
    <motion.p 
      className="text-white font-black text-[48px] absolute -top-2 -left-2 opacity-30 group-hover:opacity-50 transition-opacity duration-300"
      animate={{ 
        rotate: [-10, 0, -10],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >"\</motion.p>

    <div className="mt-1">
      <p className="text-white tracking-wider text-[18px] relative z-10">{testimonial}</p>

      <motion.div 
        className="mt-7 flex justify-between items-center gap-1"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-1 text-secondary text-[12px]">
            {designation} of {company}
          </p>
        </div>

        <motion.img
          src={image}
          alt={`feedback_by-${name}`}
          className="w-10 h-10 rounded-full object-cover"
          whileHover={{ scale: 1.2, rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
      <div className={`mt-12 bg-[#0a0c14] rounded-[20px]`}>
        <div
          className={` bg-[#111522] rounded-2xl ${styles.padding} min-h-[300px]`}
        >
          <motion.div variants={textVariant()}>
            <p className={`text-[#8ec5ff] ${styles.sectionSubText}`}>
              What others say
            </p>
            <h2 className={styles.sectionHeadText}>Testimonials.</h2>
          </motion.div>
        </div>
        <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
          {testimonials.map((testimonial, index) => (
            <FeedbackCard
              key={testimonial.name}
              index={index}
              {...testimonial}
            />
          ))}
        </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "testimonials");
