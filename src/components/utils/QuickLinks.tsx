import Link from 'next/link';

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Me' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/testimonials', label: 'Testimonials' },
];

interface QuickLinksProps {
  navClassName?: string;
  ulClassName?: string;
  liClassName?: string;
  hoverColor?: string;
  defaultColor?: string;
  layout?: 'horizontal' | 'vertical';
  showUnderline?: boolean;
  underlineClassName?: string;
}

export default function QuickLinks({
  navClassName = '',
  ulClassName = '',
  liClassName = '',
  hoverColor = '',
  layout = 'horizontal',
  showUnderline = true,
  underlineClassName = '',
}: QuickLinksProps) {
  return (
    <nav className={`${navClassName} overflow-hidden z-50`}>
      <ul
        className={`${ulClassName} flex ${
          layout === 'horizontal' ? 'flex-row sm:space-x-6' : 'flex-col gap-4'
        }`}
      >
        {navLinks.map(({ href, label }, index) => (
          <li key={index} className='m-0 relative group cursor-pointer'>
            <Link
              href={href}
              className={`${liClassName} text-white/70 font-satoshiRegular font-normal transition-all duration-200`}
            >
              <p className='relative '>
                {label}
                {showUnderline && (
                  <span
                    className={`absolute bottom-0 left-0 h-px ${underlineClassName} transition-all duration-300 scale-x-0 group-hover:scale-x-100`}
                    style={{ backgroundColor: hoverColor ?? 'black' }}
                  />
                )}
              </p>
            </Link>
            <div
              className='absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-200'
              style={{ backgroundColor: hoverColor }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
