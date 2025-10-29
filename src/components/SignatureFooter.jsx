import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SignatureFooter = () => {
  const signaturePathRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const heartRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SVG path stroke animation (simulating DrawSVG)
      if (signaturePathRef.current) {
        const pathLength = signaturePathRef.current.getTotalLength();
        
        gsap.set(signaturePathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        gsap.to(signaturePathRef.current, {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Text fade-in
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Heart pulse
      gsap.to(heartRef.current, {
        scale: 1.2,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={containerRef}
      className="relative bg-midnight-900 border-t border-midnight-700/50 py-16 overflow-hidden"
    >
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-850 via-midnight-900 to-transparent opacity-60" />
      
      {/* Teal accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Handwritten signature SVG */}
        <div className="mb-8 flex justify-center">
          <svg
            width="300"
            height="80"
            viewBox="0 0 300 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-90"
          >
            {/* Handwritten "Gowtham" signature path */}
            <path
              ref={signaturePathRef}
              d="M 20 50 Q 30 20, 50 40 T 90 50 Q 110 60, 120 40 Q 130 20, 150 45 Q 160 55, 180 40 Q 200 25, 220 50 Q 240 65, 270 45"
              stroke="url(#signatureGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="signatureGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00e6c8" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#00e6c8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Crafted text */}
        <div
          ref={textRef}
          className="flex items-center justify-center gap-3 text-gray-400 font-light text-lg tracking-wide opacity-0"
        >
          <span>Crafted with</span>
          <span
            ref={heartRef}
            className="inline-block text-2xl"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))',
            }}
          >
            💻
          </span>
          <span>by</span>
          <span className="font-brand font-semibold bg-gradient-to-r from-teal-400 to-violet-400 bg-clip-text text-transparent">
            Gowtham
          </span>
        </div>

        {/* Year and location */}
        <div className="mt-6 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} · Built with React, GSAP & Passion</p>
        </div>

        {/* Social links (minimal) */}
        <div className="mt-8 flex justify-center gap-6">
          {[
            { name: 'GitHub', href: 'https://github.com/gowthamguru1410-ctrl', color: 'hover:text-violet-400' },
            { name: 'LinkedIn', href: 'https://linkedin.com/in/gowtham', color: 'hover:text-teal-400' },
            { name: 'Email', href: 'mailto:your.email@gmail.com', color: 'hover:text-teal-400' },
          ].map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 text-sm transition-colors duration-300 ${link.color}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-midnight-950 to-transparent pointer-events-none" />
    </footer>
  );
};

export default SignatureFooter;
