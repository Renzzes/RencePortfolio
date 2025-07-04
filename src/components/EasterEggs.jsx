import React, { useEffect } from "react";
import soundEffects from "../utils/soundEffects";
import { useDevToolsOpen } from "../utils/useDevToolsOpen";
import NyanCat from "./NyanCat";

const EasterEggs = () => {
  const { isDevToolsOpen } = useDevToolsOpen();
  useEffect(() => {
    if (!isDevToolsOpen) return;
    if (typeof console !== "undefined") {
      console.clear();
      console.log(
        "%c👀 Whoa there, inspector!\n" +
          "Looks like you've cracked open the secret console vault... 🧠🔐\n" +
          "Curious minds get rewarded. Want to witness something magical?\n" +
          "Just type %cmy first name%c and press Enter. 🎩✨" +
          "%c\nSpoiler: It's not Gandalf. 😉",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 12px; border-radius: 10px; margin-top: 20px",
        "color: #00FF00; font-size: 16px; font-weight: bold; background-color: black; padding: 12px; border-radius: 10px",
        "color: #FFD700; font-size: 16px; font-weight: bold; background-color: black; padding: 12px; border-radius: 10px",
        "color: #FFD700; font-size: 12px; font-weight: bold; background-color: black; padding: 6px; border-radius: 8px; margin-top: 20px"
      );
      ["jayant", "Jayant", "JAYANT"].forEach((name) => {
        if (Object.hasOwn(window, name)) return;
        Object.defineProperty(window, name, {
          get() {
            window.__easterEggUnlocked = true;
            soundEffects.playMagic();
            console.log(
              "%c✨ ABRA KADABRA ✨\n" +
                "You've just summoned the legendary Jayant! 🧙‍♂️💻\n" +
                "What's that? Not impressed yet? 😤\n" +
                "Fine. But don't forget the golden rule:\n" +
                "⚠️ With great power comes great debugging responsibility.",
              "color: #FF4500; font-size: 18px; font-weight: bold; background-color: black; padding: 12px; border-radius: 10px; margin-top: 10px"
            );
            const timer = setTimeout(() => {
              console.log(
                "%c🤫 Pssttt...\n" +
                  "You've unlocked Level 1 of Jayant's secrets.\n" +
                  "But are you REALLY ready for Level 2?\n" +
                  "😺 If you're a true cat person, just press %c'm'%c anywhere on the screen...\n" +
                  "And brace yourself for... 🐾 Feline overload.",
                "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 8px; border-radius: 10px; margin-top: 8px",
                "color: #00FF00; font-size:18px; font-weight: bolder;margin-top: 8px;background-color: white; padding: 6px; border-radius: 8px; margin-right:6px; margin-left:6px",
                "color: #FF69B4; font-size: 16px; font-weight: bold; background-color: black; padding: 8px; border-radius: 10px; margin-top: 8px"
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
            console.log(
              "%c💥 BANKAI! %cKaten Kyokotsu: Karamatsu Shinju 🗡️",
              "color: red; font-size: 18px; font-weight: bold;",
              "color: cyan; font-size: 16px;"
            );
            return undefined;
          },
        });
      }
    }
  }, [isDevToolsOpen]);

  return <NyanCat />;
};

export default EasterEggs;
