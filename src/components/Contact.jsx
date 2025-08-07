import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import useWeb3Forms from "@web3forms/react";
import githubIcon from "../assets/social/github.svg";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { slideIn } from "../utils/motion";
import soundEffects from "../utils/soundEffects";
import { EarthCanvas } from "./canvas";
import Toast from "./ui/toast";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const { submit } = useWeb3Forms({
    access_key: "af1d3603-c8c7-417e-8ae5-6328a5e43808",
    settings: {
      from_name: "3D Portfolio Contact Form",
      subject: "New Contact Message from Portfolio Website",
    },
    onSuccess: (message, data) => {
      setLoading(false);
      soundEffects.playNotification();
      setToast({
        open: true,
        message: "Thank you. I will get back to you as soon as possible.",
        type: "success",
      });
      setForm({
        name: "",
        email: "",
        message: "",
      });
    },
    onError: (message, data) => {
      setLoading(false);
      console.error(message);
      soundEffects.playNotification();
      setToast({
        open: true,
        message: "Ahh, something went wrong. Please try again.",
        type: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      soundEffects.playNotification();
      setToast({
        open: true,
        message: "Please fill in all fields before submitting.",
        type: "error",
      });
      return;
    }
    setLoading(true);

    submit({
      name: form.name,
      email: form.email,
      message: form.message,
    });
  };

  return (
    <>
      {toast.open && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, open: false })}
        />
      )}
      <div className="w-full min-h-screen">
        <h2 className="text-white text-center font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] px-4">
          Let's Work Together
        </h2>
        <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-6 lg:gap-10 overflow-hidden text-white px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75] w-full xl:w-[40rem] bg-[#111522] p-4 sm:p-6 lg:p-8 rounded-2xl"
          >
            <p className={`text-[#8ec5ff] ${styles.sectionSubText}`}>
              Get in touch
            </p>
            <h3
              className={`${styles.sectionHeadText} text-[28px] sm:text-[32px] lg:text-[36px]`}
            >
              Contact.
            </h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-6 sm:gap-8"
              id="contact"
            >
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-2 sm:mb-4 text-sm sm:text-base">
                  Full name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="bg-[#07080d] py-3 sm:py-4 px-4 sm:px-6 placeholder:text-[#fafafa8a] rounded-lg outline-none border-none font-medium text-sm sm:text-base w-full"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-2 sm:mb-4 text-sm sm:text-base">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-[#07080d] py-3 sm:py-4 px-4 sm:px-6 placeholder:text-[#fafafa8a] rounded-lg outline-none border-none font-medium text-sm sm:text-base w-full"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-2 sm:mb-4 text-sm sm:text-base">
                  Your Message
                </span>
                <textarea
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project,"
                  className="bg-[#07080d] py-3 sm:py-4 px-4 sm:px-6 placeholder:text-[#fafafa8a] rounded-lg outline-none border-none font-medium text-sm sm:text-base w-full resize-none"
                />
              </label>

              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://github.com/Renzzes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#07080d] rounded-full flex items-center justify-center shadow-md hover:bg-[#0a0b12] transition-colors duration-200"
                >
                  <img src={githubIcon} alt="GitHub" className="w-6 h-6" />
                </a>
                <span className="text-sm text-[#fafafa8a]">Check out my GitHub profile</span>
              </div>

              <button
                type="submit"
                className="bg-[#07080d] py-3 px-6 sm:px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary text-sm sm:text-base hover:bg-[#0a0b12] transition-colors duration-200"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="xl:flex-1 my-auto h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] w-full"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
