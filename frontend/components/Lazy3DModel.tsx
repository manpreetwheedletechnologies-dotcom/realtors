import { motion } from 'framer-motion';
import { ScanFace } from 'lucide-react';

export default function Lazy3DModel() {
  return (
    <motion.div 
      className="model-container glass-panel"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="grid-overlay"></div>
      
      <motion.div 
        className="scanner-line"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      <div className="content">
        <ScanFace className="icon" />
        <h3>Point Cloud Visualization</h3>
        <p>Interactive 3D model loading...</p>
      </div>

      <style jsx>{`
        .model-container {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, rgba(0, 240, 255, 0.1) 0%, transparent 70%);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: bottom;
          opacity: 0.5;
        }

        .scanner-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-primary);
          box-shadow: 0 0 20px var(--accent-primary);
          z-index: 10;
        }

        .content {
          position: relative;
          z-index: 20;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .icon {
          width: 48px;
          height: 48px;
          color: var(--accent-primary);
          filter: drop-shadow(0 0 10px rgba(0,240,255,0.5));
        }

        h3 {
          font-size: 1.5rem;
          color: #fff;
          margin: 0;
        }

        p {
          color: var(--text-secondary);
          margin: 0;
        }
      `}</style>
    </motion.div>
  );
}
