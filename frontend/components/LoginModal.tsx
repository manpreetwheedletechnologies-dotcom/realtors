import React from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="text-center">
          <h2 className="title">Login</h2>
          <p className="subtitle">Enter your details to proceed</p>
        </div>
        <form className="mt-8">
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" placeholder="Enter Mobile Number" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" />
          </div>
          <button type="button" className="btn-primary w-full" style={{justifyContent: 'center', marginTop: '1rem'}}>
            Submit
          </button>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15,30,20,0.55); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          padding: 3rem; width: 100%; max-width: 400px; position: relative;
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
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-secondary);}
        .form-group input {
          width: 100%; padding: 0.8rem 1rem; background: rgba(255,255,255,0.9);
          border: 1px solid var(--glass-border); border-radius: 8px; color: var(--text-primary);
        }
        .form-group input::placeholder { color: #9CA8A0; }
        .form-group input:focus { outline: none; border-color: var(--accent-primary); }
        .w-full { width: 100%; }
      `}</style>
    </div>
  );
}
