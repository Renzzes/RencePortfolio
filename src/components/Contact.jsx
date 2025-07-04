import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

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

    // Check if EmailJS environment variables are configured
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setLoading(false);
      soundEffects.playNotification();
      setToast({
        open: true,
        message:
          "EmailJS configuration is missing. Please check your environment variables.",
        type: "error",
      });
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          user_name: form.name,
          my_name: "Jayant Potdar",
          user_email: form.email,
          my_email: "jayantpotdar2006@gmail.com",
          user_message: form.message,
        },
        publicKey
      )
      .then(
        () => {
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
        (error) => {
          setLoading(false);
          console.error(error);
          soundEffects.playNotification();
          setToast({
            open: true,
            message: "Ahh, something went wrong. Please try again.",
            type: "error",
          });
        }
      );
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
      <div>
        <h2 className="text-white text-center font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Lets Work Together
        </h2>
        <div
          className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden text-white`}
        >
          <motion.div
            variants={slideIn("left", "tween", 0.2, 1)}
            className="flex-[0.75] w-[40rem] bg-[#111522] p-8 rounded-2xl"
          >
            <p className={`text-[#8ec5ff] ${styles.sectionSubText}`}>
              Get in touch
            </p>
            <h3 className={styles.sectionHeadText}>Contact.</h3>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-8"
              id="contact"
            >
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-4">
                  Full name
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="bg-[#07080d] py-4 px-6 placeholder:text-[#fafafa8a] rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-4">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-[#07080d] py-4 px-6 placeholder:text-[#fafafa8a] rounded-lg outline-none border-none font-medium"
                />
              </label>
              <label className="flex flex-col">
                <span className="font-medium text-[#8ec5ff] mb-4">
                  Your Message
                </span>
                <textarea
                  rows={7}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project,"
                  className="bg-[#07080d] py-4 px-6 placeholder:text-[#fafafa8a]  rounded-lg outline-none border-none font-medium"
                />
              </label>

              <button
                type="submit"
                className="bg-[#07080d] py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </motion.div>

          <motion.div
            variants={slideIn("right", "tween", 0.2, 1)}
            className="xl:flex-1 my-auto md:h-[550px] h-[350px]"
          >
            <EarthCanvas />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Contact, "contact");
