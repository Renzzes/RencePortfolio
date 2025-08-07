import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";

import { achievements, experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Tag = ({ text }) => (
  <motion.span
    initial={{ opacity: 0.9 }}
    whileHover={{
      opacity: 1,
      scale: 1.05,
      backgroundColor: "rgba(142,173,255,0.15)"
    }}
    className="inline-block px-3 py-1 text-sm font-medium text-[#8eadff] bg-[rgba(142,173,255,0.1)] rounded-full border border-[rgba(142,173,255,0.15)] shadow-[0_2px_8px_-2px_rgba(142,173,255,0.15)] backdrop-blur-sm transition-all duration-300 ease-out"
  >
    {text}
  </motion.span>
);

const Modal = ({ isOpen, onClose, item }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (!isOpen) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? (item.images?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === (item.images?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-[rgba(17,21,34,0.95)] backdrop-blur-xl border border-[rgba(142,173,255,0.2)] rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 p-2 bg-[rgba(142,173,255,0.1)] backdrop-blur-lg border border-[rgba(142,173,255,0.2)] rounded-full">
            <img
              src={item.icon}
              alt={item.company_name || item.title}
              className="w-12 h-12 object-contain rounded-full"
            />
          </div>
          <div>
            <h3 className="text-[#8eadff] text-2xl font-bold mb-1">
              {Array.isArray(item.title) ? item.title.join(' ') : item.title}
            </h3>
            {item.company_name && (
              <p className="text-white text-lg font-semibold opacity-80">
                {item.company_name}
              </p>
            )}
            <p className="text-[#8eadff] text-sm font-medium tracking-wider opacity-80 mt-1">
              {item.date}
            </p>
          </div>
        </div>

        {item.images && (
          <div className="mt-6 relative rounded-xl overflow-hidden">
            <div className="relative h-[300px] overflow-hidden rounded-xl">
              <motion.img
                key={currentImageIndex}
                src={item.images[currentImageIndex]}
                alt={`Experience image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain bg-black/20"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full">
                {item.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                  />
                ))}
              </div>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {item.description && (
            <div className="text-gray-300 leading-relaxed">
              <h4 className="text-white text-lg font-semibold mb-2">Overview</h4>
              <p>{item.description}</p>
            </div>
          )}

          <div>
            <h4 className="text-white text-lg font-semibold mb-2">Highlights</h4>
            <ul className="space-y-2 list-disc pl-5">
              {item.points.map((point, index) => (
                <li
                  key={index}
                  className="text-gray-300 tracking-wide leading-relaxed"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {item.tags && (
            <div>
              <h4 className="text-white text-lg font-semibold mb-2">Skills & Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <Tag key={index} text={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const TimelineCard = ({ item, index, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <VerticalTimelineElement
        className="vertical-timeline-element--work group hover:cursor-pointer"
        contentStyle={{
          background: "linear-gradient(135deg, rgba(17, 21, 34, 0.95) 0%, rgba(23, 28, 45, 0.95) 100%)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(142, 173, 255, 0.15)",
          borderRadius: "1.5rem",
          boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.3), 0 0 100px -10px rgba(142, 173, 255, 0.1)",
          color: "#fff",
          padding: "2rem",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          position: "relative",
          overflow: "hidden",
          "&:hover": {
            boxShadow: "0 0 20px rgba(142, 173, 255, 0.3), 0 0 40px rgba(142, 173, 255, 0.1)",
            border: "1px solid rgba(142, 173, 255, 0.4)"
          }
        }}
        contentArrowStyle={{
          borderRight: "10px solid rgba(142, 173, 255, 0.15)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
        }}
        date={
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-[#8eadff] font-medium tracking-wider text-[14px] opacity-90 bg-[rgba(142,173,255,0.1)] px-3 py-1 rounded-full"
          >
            {item.date}
          </motion.span>
        }
        iconStyle={{
          background: "linear-gradient(135deg, rgba(142, 173, 255, 0.15) 0%, rgba(142, 173, 255, 0.05) 100%)",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(142, 173, 255, 0.2)",
          boxShadow: "0 8px 32px -10px rgba(142, 173, 255, 0.3)",
          cursor: "pointer"
        }}
        icon={
          <motion.div
            className="flex justify-center items-center w-full h-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <img
              src={item.icon}
              alt={item.company_name || item.title}
              className="w-[70%] h-[70%] object-contain rounded-full filter drop-shadow-lg"
            />
          </motion.div>
        }
        visible={true}
        >
          <div 
            className="relative group cursor-pointer overflow-hidden before:absolute before:inset-0 before:border-2 before:border-transparent before:rounded-2xl hover:before:border-[rgba(142,173,255,0.4)] before:transition-all before:duration-300 before:ease-out hover:before:shadow-[0_0_15px_rgba(142,173,255,0.3)] before:pointer-events-none" 
            onClick={() => setIsModalOpen(true)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.3, ease: "easeOut" }}
            className="relative z-10"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[rgba(142,173,255,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
              whileHover={{ scale: 1.05 }}
            />

            <h3 className="text-[#8eadff] text-[24px] font-bold mb-2">

              {Array.isArray(item.title)
                ? item.title.map((t, i) => <div key={i}>{t}</div>)
                : item.title}
            </h3>
            {item.company_name && (
              <p className="text-white text-[16px] font-semibold mb-4">

                {item.company_name}
              </p>
            )}

            <ul className="space-y-3">
              {item.points.slice(0, 2).map((point, index) => (
                <motion.li
                  key={`${type}-point-${index}`}
                  initial={{ opacity: 0.8, x: 0 }}
                  whileHover={{ opacity: 1, x: 5 }}
                  className="text-gray-300 text-[15px] pl-4 tracking-wide leading-relaxed relative before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-2 before:bg-[#8eadff] before:opacity-50 before:rounded-full"
                >
                  {point}
                </motion.li>
              ))}
              {item.points.length > 2 && (
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                  className="text-[#8eadff] text-[14px] font-medium mt-2 flex items-center gap-2 pl-4"
                >
                  Click to view more
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </motion.div>
              )}
            </ul>

            {item.tags && (
              <motion.div
                initial={{ opacity: 0.9 }}
                whileHover={{ opacity: 1 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {item.tags.slice(0, 3).map((tag, index) => (
                  <Tag key={`${type}-tag-${index}`} text={tag} />
                ))}
                {item.tags.length > 3 && (
                  <span className="text-[#8eadff] text-sm font-medium inline-flex items-center gap-1">
                    +{item.tags.length - 3} more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </VerticalTimelineElement>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
      />
    </>
  );
};

const AchievementCard = ({ achievement, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
    className="relative group"
  >
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center z-10 bg-gradient-to-b from-black/30 to-black/60 rounded-2xl pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="flex items-center gap-2 px-6 py-3 bg-[rgba(142,173,255,0.2)] rounded-full border border-[rgba(142,173,255,0.3)] shadow-[0_0_15px_rgba(142,173,255,0.3)]"
      >
        <span className="text-white font-medium">Click to view</span>
        <motion.svg
          className="w-5 h-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </motion.svg>
      </motion.div>
    </motion.div>
    <div className="bg-gradient-to-br from-[rgba(17,21,34,0.9)] to-[rgba(17,21,34,0.7)] backdrop-blur-xl border border-[rgba(142,173,255,0.15)] rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(142,173,255,0.2)] hover:border-[rgba(142,173,255,0.3)]">
      <div className="relative p-8">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-br from-[rgba(142,173,255,0.2)] to-[rgba(142,173,255,0.1)] backdrop-blur-lg border border-[rgba(142,173,255,0.2)] rounded-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
            <img
              src={achievement.icon}
              alt={achievement.title}
              className="w-12 h-12 object-contain filter drop-shadow-[0_2px_8px_rgba(142,173,255,0.3)]"
            />
          </div>
          <div className="ml-4">
            <h3 className="text-[#8eadff] text-2xl font-bold group-hover:text-white transition-colors duration-300">
              {Array.isArray(achievement.title)
                ? achievement.title.map((t, i) => <div key={i}>{t}</div>)
                : achievement.title}
            </h3>
            <p className="text-[#8eadff] text-sm font-medium tracking-wider opacity-80 mt-1">
              {achievement.date}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          {achievement.points.map((point, pointIndex) => (
            <div
              key={pointIndex}
              className="bg-[rgba(142,173,255,0.05)] rounded-lg p-4 transform transition-all duration-300 hover:translate-x-1 hover:bg-[rgba(142,173,255,0.1)]"
            >
              <p className="text-gray-300 text-sm tracking-wide leading-relaxed group-hover:text-white transition-colors duration-300">
                {point}
              </p>
              {achievement.credential && achievement.credential[pointIndex] && (
                <div className="mt-3">
                  <a
                    href={achievement.credential[pointIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(142,173,255,0.1)] rounded-lg text-[#8eadff] text-sm font-medium hover:bg-[rgba(142,173,255,0.2)] hover:text-white transition-all duration-300 group/link"
                  >
                    <span>View Certificate</span>
                    <svg
                      className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const Achievement = () => {
  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 2rem"
  };
  return (
    <>
      {/* Professional Timeline Section */}
      <motion.div
        variants={textVariant()}
        className="relative z-0 w-full flex flex-col items-center"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(142, 173, 255, 0.4) 0%, transparent 70%)",
              filter: "blur(60px)"
            }}
          />
        </div>
        <p className={`${styles.sectionSubText} text-center text-[#8eadff] opacity-80 tracking-wider uppercase mb-2`}>
          Professional Timeline
        </p>
        <h2 className={`${styles.sectionHeadText} text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8eadff]`}>
          Career Journey
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col" style={containerStyle}>
        <VerticalTimeline
          animate={true}
          lineColor="rgba(142, 173, 255, 0.2)"
          className="vertical-timeline-custom-line"
        >
          {experiences.map((experience, index) => (
            <TimelineCard
              key={`experience-${index}`}
              item={experience}
              index={index}
              type="experience"
            />
          ))}
        </VerticalTimeline>
      </div>

      {/* Achievements Section */}
      <motion.div
        variants={textVariant()}
        className="relative z-0 w-full flex flex-col items-center mt-32"
      >
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(142, 173, 255, 0.4) 0%, transparent 70%)",
              filter: "blur(60px)"
            }}
          />
        </div>
        <p className={`${styles.sectionSubText} text-center text-[#8eadff] opacity-80 tracking-wider uppercase mb-2`}>
          Professional Certifications
        </p>
        <h2 className={`${styles.sectionHeadText} text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8eadff]`}>
          Technical Expertise
        </h2>
      </motion.div>

      <div className="mt-20 relative overflow-hidden w-full group/container">
        <motion.div 
          className="flex gap-8 py-4 px-4 sm:px-6 lg:px-8 group-hover/container:[animation-play-state:paused]"
          animate={{
            x: ["-15%", "-85%"]
          }}
          transition={{
            x: {
              duration: 15,
              repeat: Infinity,
              ease: "linear",
              repeatType: "reverse"
            }
          }}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "subpixel-antialiased",
            animationPlayState: "running"
          }}
        >
          {/* Double the achievements for seamless loop */}
          {[...achievements, ...achievements].map((achievement, index) => (
            <motion.div
              key={`achievement-${index}`}
              className="flex-none w-[400px]"
              whileHover={{ scale: 1.02 }}
            >
              <AchievementCard
                achievement={achievement}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Achievement, "achievements");
