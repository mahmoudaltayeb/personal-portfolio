
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Code } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export interface ProjectProps {
  title: string;
  description: string;
  imageSrc: string;
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
  featured?: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  imageSrc,
  liveUrl,
  githubUrl,
  techStack,
  featured = false,
  index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cardRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { 
          y: 50,
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  const isEven = index % 2 === 0;
  
  return (
    <div 
      ref={cardRef}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} 
                 gap-6 lg:gap-10 mb-24 last:mb-0 group`}
    >
      <div className="lg:w-3/5 overflow-hidden rounded-lg shadow-lg relative">
        <div className="absolute inset-0 bg-highlight/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
        />
      </div>
      
      <div className="lg:w-2/5 flex flex-col justify-center">
        {featured && (
          <span className="text-highlight text-sm font-medium mb-2 flex items-center">
            <Code size={16} className="mr-2" />
            Featured Project
          </span>
        )}
        
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        
        <p className="text-lightText/70 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="bg-secondary text-lightText/80 border-none">
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-4">
          <a 
            href={liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-highlight hover:underline"
          >
            <ExternalLink size={16} className="mr-1" />
            Live Demo
          </a>
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-lightText/80 hover:text-highlight transition-colors"
          >
            <Github size={16} className="mr-1" />
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
