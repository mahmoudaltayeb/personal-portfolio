
import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Github, Linkedin, Link } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the title
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
      
      // Animate the form and contact info
      gsap.fromTo(
        ".contact-content > div",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-content",
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate the social icons
      gsap.fromTo(
        ".social-link",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: ".contact-socials",
            start: "top bottom-=50",
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    return () => ctx.revert();
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    }, 1500);
  };
  
  return (
    <section id="contact" className="py-20 container-custom">
      <h2 ref={titleRef} className="section-title">Get In Touch</h2>
      
      <div className="contact-content mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-secondary border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-secondary border border-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-highlight resize-none"
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
        
        <div className="lg:pl-10">
          <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="text-highlight mr-4 mt-1" />
              <div>
                <h4 className="font-medium">Email</h4>
                <a 
                  href="mailto:altayebm804@gmail.com" 
                  className="text-lightText/70 hover:text-highlight transition-colors"
                >
                  altayebm804@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="text-highlight mr-4 mt-1" />
              <div>
                <h4 className="font-medium">Phone</h4>
                <a 
                  href="tel:+201124912436" 
                  className="text-lightText/70 hover:text-highlight transition-colors"
                >
                  +20 1124912436
                </a>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mt-10 mb-6">Connect</h3>
          <div className="contact-socials flex space-x-5">
            <a 
              href="https://github.com/mahmoudaltayeb" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link bg-secondary hover:bg-highlight/20 transition-colors duration-300 p-3 rounded-full"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mahmoud-altayeb/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link bg-secondary hover:bg-highlight/20 transition-colors duration-300 p-3 rounded-full"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
