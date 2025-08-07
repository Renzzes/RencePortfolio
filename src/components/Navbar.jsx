import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NAV_LINKS = [
  { title: "home", href: "#hero", img: "/assets/nav-link-previews/home.png" },
  {
    title: "about",
    href: "#about",
    img: "/assets/nav-link-previews/about.png",
  },
  {
    title: "achievements",
    href: "#achievements",
    img: "/assets/nav-link-previews/achievements.png",
  },
  {
    title: "skills",
    href: "#skills",
    img: "/assets/nav-link-previews/skills.png",
  },
  {
    title: "project",
    href: "#projects",
    img: "/assets/nav-link-previews/projects.png",
  },
  {
    title: "testimonials",
    href: "#testimonials",
    img: "/assets/nav-link-previews/testimonials.png",
  },
  {
    title: "contact",
    href: "#contact",
    img: "/assets/nav-link-previews/contact.png",
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`z-30 fixed top-0 left-0 w-full transition-all duration-500 ease-in-out ${scrolled ? "backdrop-blur-2xl bg-white/5" : "bg-transparent"}`}
      style={{
        boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none"
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-center max-w-8xl my-2 mx-4 relative">
        <nav className="flex items-center justify-between w-full max-w-6xl px-6">
          <a href="#hero" className="flex items-center justify-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8eadff] hover:from-[#8eadff] hover:to-white transition-all duration-500 ease-in-out transform hover:scale-105">
              Renz Portfolio
            </span>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {NAV_LINKS.map((link) => (
              <div
                key={link.title}
                className="relative group"
              >
                <motion.a
                  href={link.href}
                  className="text-[#8eadff] text-sm uppercase tracking-wider font-medium relative block px-4 py-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    {link.title}
                  </span>
                  <div
                    className="absolute inset-0 -z-10 bg-[#8eadff]/10 rounded-lg opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                  />
                </motion.a>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#8eadff] p-2 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-white/10 md:hidden"
              >
                <div className="flex flex-col items-center py-4 gap-2">
                  {NAV_LINKS.map((link) => (
                    <motion.a
                      key={link.title}
                      href={link.href}
                      className="text-[#8eadff] text-sm uppercase tracking-wider font-medium w-full text-center py-3 hover:bg-[#8eadff]/10 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.title}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
