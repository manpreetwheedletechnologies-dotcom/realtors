import Image from 'next/image';
import Logo_w from '../public/logo.png'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
        {/* Abstract 3D/Infrastructure SVG Logo */}
        <Image
          src={Logo_w}
          alt="PGI Land Realtors – green & black logo"
          className="h-12 w-auto"
          priority
        />
    </div>
  );
}
