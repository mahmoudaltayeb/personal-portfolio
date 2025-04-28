
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AnimatedText from './AnimatedText';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.2 }
      );
      
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.6 }
      );
      
      gsap.fromTo(
        '.scroll-indicator',
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          delay: 2.2,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut"
        }
      );
    }, heroRef);
    
    return () => ctx.revert(); // cleanup
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col justify-center items-center relative px-4">
      <div className="text-center max-w-4xl mx-auto">
        <AnimatedText 
          text="Software Developer" 
          className="text-xl font-light tracking-wider text-highlight mb-4"
          delay={0.2}
          duration={0.5}
          tag="p"
        />
        
        <AnimatedText 
          text="Crafting Digital Experiences That Matter" 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          delay={0.5}
          tag="h1"
        />
        
        <p className="hero-subtitle text-xl text-lightText/80 mb-8 max-w-2xl mx-auto">
          I design and build applications that are not just functional, but delightful to use. 
          Specializing in modern web technologies to create seamless digital experiences.
        </p>
        
        <div className="hero-cta flex justify-center gap-4">
          <button 
            onClick={scrollToProjects}
            className="btn-primary"
          >
            View My Work
          </button>
          <a 
            href="#contact" 
            className="border border-highlight text-highlight font-medium py-2 px-6 rounded-md hover:bg-highlight/10 transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </div>
      
      <div className="scroll-indicator absolute bottom-12 flex flex-col items-center">
        <span className="text-sm text-lightText/60 mb-2">Scroll to explore</span>
        <ChevronDown className="animate-bounce text-highlight" size={24} />
      </div>
    </section>
  );
};

export default HeroSection;
