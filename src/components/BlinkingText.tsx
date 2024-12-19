import React, { useState, useEffect } from "react";
import styles from '@/styles/blinkingtext.module.css'

interface BlinkingTextProps {
  texts: string[] ; // Array of texts to show
  typingSpeed?: number; // Speed for typing in ms
  pauseTime?: number; // Pause time after typing each text in ms
  fontSize?: number | string;
  fontFamily?: string;
  display?: string;

}

const Blinkingtext: React.FC<BlinkingTextProps> = ({
  texts,
  typingSpeed = 150, // Default typing speed
  pauseTime = 2000, // Default pause time before deleting text
}) => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[textIndex];
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));

        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), pauseTime); // Start deleting after pause
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));

        if (currentText === "") {
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Move to the next text
        }
      }
    };

    const timeoutId = setTimeout(handleTyping, typingSpeed);
    setTypingTimeout(timeoutId as unknown as number);

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [currentText, isDeleting, textIndex, texts, typingSpeed, pauseTime]);

  return (
    <div className="font-satoshiRegular h-20 text-gray-600 inline-block indent-10 text-lg">
      <span>{currentText}</span>
      <span className={`${styles.blinkingCursor}`}>|</span>
    </div>
  );
};

export default Blinkingtext;
