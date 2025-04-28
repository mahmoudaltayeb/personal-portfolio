
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: number; // 0-100
  color?: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "JavaScript", level: 90, color: "#61DAFB" },
      { name: "TypeScript", level: 85, color: "#007ACC" },
      { name: "reactjs", level: 80, color: "#F7DF1E" },
      { name: "HTML/CSS", level: 95, color: "#E34F26" },
      { name: "Next.js", level: 80, color: "#000000" },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85, color: "#339933" },
      { name: "Express", level: 80, color: "#000000" },
      { name: "MongoDB", level: 75, color: "#47A248" },
      { name: "GraphQL", level: 65, color: "#E10098" }
    ]
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 90, color: "#F05032" },
      { name: "Docker", level: 60, color: "#2496ED" },
      { name: "Figma", level: 90, color: "#F24E1E" },
      { name: "Illustrator", level: 90, color: "#3c240c" },
    ]
  }
];

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;
    
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(
        titleRef.current,
        { y: 20, opacity: 0 },
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
      
      // Animate skill categories
      gsap.fromTo(
        ".skill-category",
        { y: 30, opacity: 0 },
        { 
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate skill bars
      gsap.utils.toArray<HTMLElement>(".skill-bar-fill").forEach((bar) => {
        const percentage = bar.dataset.percentage || "0";
        
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${percentage}%`,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top bottom-=50",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-black/20">
      <div className="container-custom">
        <h2 ref={titleRef} className="section-title">Technical Skills</h2>
        
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="skill-category bg-secondary rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-6 text-highlight">{category.title}</h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill">
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-lightText/60">{skill.level}%</span>
                    </div>
                    <div className="skill-bar h-2 w-full bg-darkBg rounded-full overflow-hidden">
                      <div 
                        className="skill-bar-fill h-full rounded-full" 
                        style={{ backgroundColor: skill.color || '#9b87f5' }}
                        data-percentage={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
