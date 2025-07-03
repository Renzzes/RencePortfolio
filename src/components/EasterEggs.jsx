import React, { useEffect } from "react";
import { useDevToolsOpen } from "../utils/useDevToolsOpen";
import NyanCat from "./NyanCat";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console !== "undefined") {
      console.clear();
      console.log(
        "%cWhoa, look at you! 🕵️‍♂️\n" +
          "You seem to have discovered the secret console! 🔍\n" +
          "Want to see some magic? ✨\n" +
          "Just type %cmy first name%c and hit enter! 🎩🐇",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:20px",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
      );
      ["jayant", "Jayant", "JAYANT"].forEach((name) => {
        if (Object.hasOwn(window, name)) return;
        Object.defineProperty(window, name, {
          get() {
            window.__easterEggUnlocked = true;
            console.log(
              "%c✨ Abra Kadabra! ✨\n" +
                "You just summoned the magic of Jayant! 🧙‍♂️\n" +
                "What??? your not impressed? Fine, but remember: With great power comes great responsibility! 💻⚡",
              "color: #FF4500; font-size: 18px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px; margin-top:10px"
            );
            const timer = setTimeout(() => {
              console.log(
                "%cPssttt! 🤫\n\n" +
                  "Do you like cats?? 😺 If yes, then press 'm' on viewport and see what happens! 🐱✨",
                "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 10px; border-radius: 10px;"
              );
              clearTimeout(timer);
            }, 7000);
            return "";
          },
        });
      });
      if (!Object.hasOwn(window, "Bankai")) {
        Object.defineProperty(window, "Bankai", {
          get() {
            return "Katen Kyokotsu: Karamatsu Shinju";
          },
        });
      }
    }
  }, [isDevToolsOpen]);

  return <NyanCat />;
};

export default EasterEggs;
