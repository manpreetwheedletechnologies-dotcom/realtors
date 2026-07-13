import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * StackingSections
 * -----------------
 * Ochi.design jaisa "card stack" scroll effect: har section sticky rehta hai
 * top par, aur agla section uske upar slide karke use "cover" kar deta hai.
 *
 * USAGE:
 * <StackingSections>
 *   <StackPanel className="bg-emerald-500">Section 1 content</StackPanel>
 *   <StackPanel className="bg-black">Section 2 content</StackPanel>
 *   <StackPanel className="bg-white">Section 3 content</StackPanel>
 * </StackingSections>
 *
 * Har StackPanel apne aap full-height sticky ban jata hai, z-index apne
 * aap increasing order me lagta hai (baad wala upar).
 */

export function StackingSections({ children, className = '' }) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={`relative ${className}`}>
      {items.map((child, i) =>
        // Clone karke har panel ko uska index/zIndex/total de rahe hain
        child && typeof child === 'object'
          ? {
              ...child,
              props: {
                ...child.props,
                __stackIndex: i,
                __stackTotal: items.length,
              },
            }
          : child
      )}
    </div>
  );
}

export function StackPanel({
  children,
  className = '',
  __stackIndex = 0,
  __stackTotal = 1,
  scaleEffect = true, // pichla panel thoda scale-down + dim ho (ochi jaisa depth feel)
}) {
  const ref = useRef(null);

  // Is panel ke "cover hone" wale phase ko track karte hain:
  // jab agla panel isko dhakna start kare, tab se leke fully dhak jaye tak
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'], // jab panel top se chipakta hai -> jab woh scroll ho kar nikal jata hai
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    scaleEffect ? [1, 0.9] : [1, 1]
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <div
      ref={ref}
      className="sticky top-0 h-screen w-full"
      style={{ zIndex: __stackIndex + 1 }} // baad wala panel hamesha upar
    >
      <motion.div
        style={{ scale: scaleEffect ? scale : 1, opacity }}
        className={`h-full w-full flex items-center justify-center overflow-hidden rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-2xl ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}