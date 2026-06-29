import React, { useState } from 'react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const categories = [
    { id: 'road', name: 'Road Construction' },
    { id: 'bridge', name: 'Bridge & Flyover' },
    { id: 'rail', name: 'Railways & Metro' },
    { id: 'measure', name: 'Measurement' },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="text-center">
          <h2 className="title">Select Category</h2>
          <p className="subtitle">Choose the project type you want to explore</p>
        </div>
        <div className="grid mt-8">
           {categories.map(cat => (
             <div 
               key={cat.id} 
               className={`cat-card ${selected === cat.id ? 'active' : ''}`}
               onClick={() => setSelected(cat.id)}
             >
               {cat.name}
             </div>
           ))}
        </div>
        <button className="btn-primary w-full" disabled={!selected} style={{justifyContent: 'center', marginTop: '2rem'}}>
          Proceed
        </button>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15,30,20,0.55); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          padding: 3rem; width: 100%; max-width: 500px; position: relative;
        }
        .close-btn {
          position: absolute; top: 1rem; right: 1rem;
          background: transparent; border: none; color: var(--text-secondary);
          font-size: 1.5rem; cursor: pointer;
        }
        .close-btn:hover { color: var(--text-primary); }
        .text-center { text-align: center; color: var(--text-primary); }
        .title { font-size: 2rem; margin-bottom: 0.5rem; color: var(--text-primary); }
        .subtitle { color: var(--text-secondary); }
        .mt-8 { margin-top: 2rem; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .cat-card {
          padding: 1rem; text-align: center; border: 1px solid var(--glass-border);
          border-radius: 8px; cursor: pointer; transition: all 0.2s;
          background: rgba(255,255,255,0.9); color: var(--text-primary);
        }
        .cat-card:hover { border-color: rgba(31,107,61,0.3); background: rgba(31,107,61,0.04); }
        .cat-card.active { border-color: var(--accent-primary); background: rgba(31, 107, 61, 0.1); color: var(--accent-primary); font-weight: bold;}
        .w-full { width: 100%; }
        button:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
