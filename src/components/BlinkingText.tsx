import React, { useState, useEffect, useMemo } from "react";
import styles from "@/styles/blinkingtext.module.css";

interface BlinkingTextProps {
  texts: string[]; // Array of texts to show
  typingSpeed?: number; // Speed for typing in ms
  pauseTime?: number; // Pause time after typing each text in ms
  fontSize?: number | string;
  fontFamily?: string;
  display?: string;
}

const Blinkingtext: React.FC<BlinkingTextProps> = ({
  texts,
  typingSpeed = 150,
  pauseTime = 2000,
}) => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Memoize texts array to prevent re-renders
  const memoizedTexts = useMemo(() => texts, [texts]);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = memoizedTexts[textIndex];

      if (!isDeleting) {
        setCurrentText((prev) => fullText.substring(0, prev.length + 1));

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseTime); // Start deleting after pause
        }
      } else {
        setCurrentText((prev) => fullText.substring(0, prev.length - 1));

        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % memoizedTexts.length);
        }
      }
    };

    const timeoutId = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [currentText, isDeleting, textIndex, memoizedTexts, typingSpeed, pauseTime]);

  return (
    <div className="font-satoshiRegular h-20 text-gray-600 inline-block indent-10 text-lg">
      <span>{currentText}</span>
      <span className={`${styles.blinkingCursor}`}>|</span>
    </div>
  );
};

export default Blinkingtext;
