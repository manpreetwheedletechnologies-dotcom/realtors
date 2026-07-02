// utils/animations.js
export const fadeInUp = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.15
    }
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 120,
      damping: 15
    }
  }
};

export const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pulseAnimation = {
  scale: [1, 1.08, 1],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut"
  }
};