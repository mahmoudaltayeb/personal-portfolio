
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.7,
  tag = 'h1',
}) => {
  const textRef = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.querySelectorAll('.word'),
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: duration,
          delay: delay,
          ease: 'power3.out',
        }
      );
    }
  }, [delay, duration]);

  const Tag = tag;
  
  return React.createElement(
    Tag,
    { ref: textRef, className },
    words.map((word, i) => (
      <span key={i} className="word inline-block mr-1 last:mr-0">
        {word}
      </span>
    ))
  );
};

export default AnimatedText;
