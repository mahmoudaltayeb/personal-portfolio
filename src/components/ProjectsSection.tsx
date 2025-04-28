
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ProjectCard, { ProjectProps } from './ProjectCard';

const projects: ProjectProps[] = [
  {
    title: "News platform",
    description: "A full-featured news platform built with next and headless wordpress.",
    imageSrc: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    liveUrl: "https://alelm.net/",
    githubUrl: "#",
    techStack: ["Next", "Wordpress", "mysql"],
    featured: true,
    index: 0
  },
  {
    title: "Travel Booking Website ",
    description: "A travel agency site with multilingual support (3 languages). Features include trip listings, detailed itineraries, and a seamless booking system, all designed for an intuitive user experience from scratch.",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=3882&q=80",
    liveUrl: "#",
    githubUrl: "#",
    techStack: ["Wordpress", "Custom theme", "mysql"],
    index: 1
  },
  {
    title: "Luxurious bags site",
    description: "Al-anaqah is a site focus on louxourious bags.",
    imageSrc: "https://al-anaqah.com/cdn/shop/files/2.jpg?v=1715696988",
    liveUrl: "https://al-anaqah.com/",
    githubUrl: "#",
    techStack: ["Shopify", "cms", "HTML5", "CSS3"],
    index: 2
  },
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
