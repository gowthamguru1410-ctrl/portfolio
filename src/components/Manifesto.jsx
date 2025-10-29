import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const manifestoRef = useRef(null);
  const linesRef = useRef([]);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered line reveals with custom easing
      gsap.fromTo(
        linesRef.current,
        {
          opacity: 0,
          y: 60,
          rotateX: -15,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.4,
          ease: 'power4.out',
          stagger: 0.25,
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 70%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Decorative element glow animation
      gsap.to(decorRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, manifestoRef);

    return () => ctx.revert();
  }, []);

  const lines = [
    "I build with purpose, not just for pixels.",
    "Every detail matters — design is intentional.",
    "Code is craft. Every line tells a story.",
  ];

  return (
    <section
      ref={manifestoRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-midnight-900 py-32"
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-800 via-midnight-900 to-midnight-850 opacity-80" />
      
      {/* Decorative glow orb */}
      <div
        ref={decorRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-12 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-sm font-medium text-teal-400 tracking-wider uppercase">
            My Philosophy
          </span>
        </motion.div>

        {/* Manifesto lines */}
        <div className="space-y-8 perspective-1000">
          {lines.map((line, index) => (
            <h2
              key={index}
              ref={(el) => (linesRef.current[index] = el)}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-brand font-bold leading-tight tracking-tight opacity-0"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #00e6c8 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {line}
            </h2>
          ))}
        </div>

        {/* Accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-teal-500 to-transparent"
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-8 text-lg text-gray-400 font-light tracking-wide"
        >
          — Gowtham, Software Developer & Creative Engineer
        </motion.p>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight-850 to-transparent pointer-events-none" />
    </section>
  );
};

export default Manifesto;
