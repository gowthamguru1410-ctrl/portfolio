import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    y: 20,
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    scale: 1.02,
    y: -20,
  },
}

const pageTransition = {
  type: 'tween',
  ease: [0.43, 0.13, 0.23, 0.96],
  duration: 0.6,
}

// Slide transition for sections
export const slideVariants = {
  initial: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  in: {
    x: 0,
    opacity: 1,
  },
  out: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
}

// Fade and scale
export const fadeScaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.1,
  },
}

// Stagger children animation
export const staggerContainer = {
  initial: {},
  in: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  out: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

export const staggerItem = {
  initial: {
    opacity: 0,
    y: 30,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -30,
  },
}

// Page Transition Wrapper Component
export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// Section Transition Component
export function SectionTransition({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Reveal on Scroll
export function RevealOnScroll({ children, direction = 'up', delay = 0, className = '' }) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Parallax Scroll Effect
export function ParallaxScroll({ children, speed = 0.5, className = '' }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: 0 }}
      viewport={{ once: false }}
      transition={{
        duration: 0,
      }}
      style={{
        transform: `translateY(calc(var(--scroll) * ${speed}))`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Loading Transition
export function LoadingTransition({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 backdrop-blur-md"
        >
          <div className="text-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-16 h-16 mx-auto mb-4 border-4 border-primary-500 border-t-transparent rounded-full"
            />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-400 text-lg"
            >
              Loading...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
