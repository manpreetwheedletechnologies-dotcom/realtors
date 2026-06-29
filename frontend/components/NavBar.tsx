import Link from 'next/link';
import { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import Logo from './Logo';

export default function NavBar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <>
      <nav className="top-nav glass">
         <div className="nav-container">
           <Link href="/"><Logo /></Link>
           <div className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/measurement">Measurements</Link>
              <Link href="/videos">Videos</Link>
              <Link href="/about">About</Link>
              <Link href="/#contact">Contact</Link>
              <Link href="/trial-info?category=road">Trials</Link>
           </div>
           <div className="nav-actions">
              <button className="btn-outline" style={{padding: '0.4rem 1rem'}} onClick={() => setIsLoginOpen(true)}>Login</button>
              <button className="btn-secondary" style={{padding: '0.4rem 1rem'}} onClick={() => setIsRegisterOpen(true)}>Get Started</button>
           </div>
         </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
}
