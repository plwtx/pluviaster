import { useRef, useMemo } from "react";
import { motion, useInView } from "motion/react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
  threshold?: number;
  repeat?: boolean;
  speed?: number;
};

export const TypewriterText = ({
  text,
  className = "",
  delay = 0,
  triggerOnScroll = true,
  threshold = 0.5,
  repeat = false,
  speed = 0.03,
}: TypewriterTextProps) => {
  const ref = useRef<HTMLHeadingElement>(null);

  const wordsData = useMemo(() => {
    const result: { word: string; startIndex: number }[] = [];
    let globalIndex = 0;
    for (const word of text.split(" ")) {
      result.push({ word, startIndex: globalIndex });
      globalIndex += word.length;
    }
    return result;
  }, [text]);

  const isInView = useInView(ref, {
    once: !repeat,
    amount: threshold,
  });

  const shouldAnimate = triggerOnScroll ? isInView : true;

  return (
    <h2 ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {wordsData.map(({ word, startIndex }, i) => (
          <span key={i} className="inline-block whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={`${i}-${charIndex}`}
                initial={{ opacity: 0, y: 5 }}
                animate={
                  shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }
                }
                transition={{
                  duration: 0.1,
                  delay: delay + (startIndex + charIndex) * speed,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </span>
    </h2>
  );
};
