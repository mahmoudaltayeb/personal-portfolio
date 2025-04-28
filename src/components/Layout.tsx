import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { Download } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);
  
  // Initialize menu animation timeline
  useEffect(() => {
    menuTimeline.current = gsap.timeline({ paused: true });
    if (menuTimeline.current) {
      menuTimeline.current
        .to('.mobile-menu', {
          x: '0%',
          duration: 0.5,
          ease: 'power3.out'
        })
        .fromTo('.mobile-menu-link', {
          opacity: 0,
          y: 10
        }, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.3
        });
    }
  }, []);
  
  // Toggle menu animation
  useEffect(() => {
    if (menuTimeline.current) {
      if (isMenuOpen) {
        menuTimeline.current.play();
        document.body.style.overflow = 'hidden';
      } else {
        menuTimeline.current.reverse();
        document.body.style.overflow = '';
      }
    }
  }, [isMenuOpen]);
  
  // Handle navigation appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      
      if (window.scrollY > 100) {
        navRef.current.classList.add('nav-scrolled');
      } else {
        navRef.current.classList.remove('nav-scrolled');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { label: 'Home', href: '#' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
    }
  };

  // Create downloadable content
  const handleDownload = () => {
    // Example resume file - in a real app, replace with your actual resume file path
    const dummyContent = `
    John Doe
    Full Stack Developer
    
    Experience:
    - Senior Developer at Tech Corp
    - Lead Developer at StartupX
    
    Skills:
    - React, TypeScript, Node.js
    - MongoDB, PostgreSQL
    - AWS, Docker
    `;

    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <nav 
        ref={navRef} 
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-highlight">
            Portfolio
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-10">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lightText/80 hover:text-highlight transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-highlight after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            ></span>
            <span 
              className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            ></span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="mobile-menu fixed inset-0 bg-darkBg transform translate-x-full md:hidden z-40 flex items-center justify-center">
          <ul className="flex flex-col items-center space-y-8 text-2xl">
            {navItems.map((item, index) => (
              <li key={index} className="mobile-menu-link">
                <a 
                  href={item.href} 
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-lightText hover:text-highlight transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <main>
        {children}
      </main>
      
      <footer className="py-8 bg-black">
        <div className="container-custom">
          <div className="flex flex-col items-center space-y-4">
            <button 
              onClick={handleDownload}
              className="flex items-center space-x-2 bg-highlight text-darkBg px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              <Download size={20} />
              <span>Download Resume</span>
            </button>
            <p className="text-lightText/60">
              © {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Layout;
