import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container split-layout">
        <div className="footer-left">
          <Logo className="mb-md" />
          <p>Universal construction monitoring platform for planning, measurement, and execution.</p>
        </div>
        <div className="footer-links">
           <div className="link-col">
             <h4>PLATFORM</h4>
             <a href="#">Design Framework</a>
             <a href="#">Field Data Entry</a>
             <a href="#">Drone Upload</a>
             <a href="#">Web Monitoring</a>
           </div>
           <div className="link-col">
             <h4>SOLUTIONS</h4>
             <a href="#">Road Construction</a>
             <a href="#">Bridge Projects</a>
             <a href="#">Building Works</a>
             <a href="#">Railway Infrastructure</a>
           </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 PGI Realtors — All Rights Reserved.</p>
        <div className="footer-bottom-links">
           <a href="#">Privacy Policy</a>
           <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
