
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ProjectCard, { ProjectProps } from './ProjectCard';

const projects: ProjectProps[] = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes user authentication, product catalog, shopping cart, and payment processing with Stripe.",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=2426&q=80",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
    featured: true,
    index: 0
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates using Socket.io. Features include task assignment, due date tracking, and project organization.",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=3882&q=80",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["React", "TypeScript", "Socket.io", "Firebase", "Tailwind CSS"],
    index: 1
  },
  {
    title: "Weather Dashboard",
    description: "A weather forecasting application that utilizes the OpenWeather API to provide current conditions and 7-day forecasts. Includes location-based searches and interactive maps.",
    imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=4076&q=80",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["JavaScript", "OpenWeather API", "Chart.js", "HTML5", "CSS3"],
    index: 2
  }
];

const ProjectsSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!titleRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { 
          y: 20,
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section id="projects" className="py-20 container-custom">
      <h2 ref={titleRef} className="section-title">Featured Projects</h2>
      
      <div className="mt-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
