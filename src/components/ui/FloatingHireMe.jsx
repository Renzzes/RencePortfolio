import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import facebookIcon from '../../assets/social/facebook.svg';
import whatsappIcon from '../../assets/social/whatsapp.svg';
import linkedinIcon from '../../assets/social/linkedin.svg';

const FloatingHireMe = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { icon: facebookIcon, url: 'https://www.facebook.com/clarence.bersamora', name: 'Facebook', bgColor: 'bg-tertiary' },
    { icon: whatsappIcon, url: 'https://wa.me/+639624816474', name: 'WhatsApp', bgColor: 'bg-tertiary' },
    { icon: linkedinIcon, url: 'https://www.linkedin.com/in/clarence-emmanuel-jamora-06b6aa205', name: 'LinkedIn', bgColor: 'bg-tertiary' }
  ];

  return (
    <motion.div 
      className="fixed bottom-10 right-10 z-50"
      animate={{
        y: [0, -10, 0]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        {/* Outer rotating border with pulse */}
        <motion.div
          className="absolute -inset-2 rounded-full border-2 border-secondary/50"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        {/* Inner rotating border with pulse */}
        <motion.div
          className="absolute -inset-1 rounded-full border-2 border-tertiary"
          animate={{
            rotate: -360,
            scale: [1.2, 1, 1.2],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            rotate: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            },
            opacity: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        {/* Social Icons */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute right-0 bottom-full mb-4 flex flex-col items-end space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-14 h-14 ${social.bgColor} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 ease-in-out`}
                    initial={{ y: 20, opacity: 0, scale: 0.3 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.3 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                  >
                    <img src={social.icon} alt={social.name} className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" />
                  </motion.a>
                ))}
              </div>
            )}
          </AnimatePresence>

        {/* Button content */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center justify-center w-16 h-16 bg-tertiary rounded-full shadow-lg hover:shadow-secondary/50 hover:scale-110 transition-all duration-300 ease-in-out"
        >
          <motion.span 
            className="text-white text-base font-medium whitespace-nowrap tracking-wider"
            initial={false}
            animate={{
              scale: isOpen ? 0.8 : 1,
              rotate: isOpen ? 45 : 0
            }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            {isOpen ? '+' : 'Hire me'}
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
};

export default FloatingHireMe;