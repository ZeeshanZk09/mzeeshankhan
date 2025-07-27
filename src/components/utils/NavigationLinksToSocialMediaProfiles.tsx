import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SocialMediaLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface NavigationLinksToSocialMediaProfilesProps {
  className?: string;
  iconClassName?: string;
  hoverColor?: string;
  defaultColor?: string;
  iconSize?: number;
  links?: SocialMediaLink[];
  layout?: 'horizontal' | 'vertical';
  showLabels?: boolean;
  labelClassName?: string;
}

const defaultLinks: SocialMediaLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/muhammad-zeeshan-khan-96478528b/',
    icon: (
      <Image
        src={'/assets/images/social-icons/linkedIn.svg'}
        alt='linkedIn'
        width={1000}
        height={1000}
      />
    ),
  },
  {
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/~01ac7dbd1886628aad',
    icon: (
      <Image
        src={'/assets/images/social-icons/upwork.svg'}
        alt='Upwork'
        width={1000}
        height={1000}
      />
    ),
  },
  {
    name: 'GitHub',
    url: 'https://github.com/ZeeshanZk09',
    icon: (
      <Image
        src={'/assets/images/social-icons/github.svg'}
        alt={'GitHub'}
        width={1000}
        height={1000}
      />
    ),
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@pnacampus.5081',
    icon: (
      <Image
        src={'/assets/images/social-icons/youtube.svg'}
        alt={'Youtube'}
        width={1000}
        height={1000}
      />
    ),
  },
];

export default function NavigationLinksToSocialMediaProfiles({
  className = '',
  iconClassName = '',
  hoverColor = '',
  defaultColor = '', // slate-400
  iconSize = 40,
  links = defaultLinks,
  layout = 'horizontal',
  showLabels = false,
  labelClassName = '',
}: NavigationLinksToSocialMediaProfilesProps) {
  return (
    <nav
      className={`flex ${
        layout === 'horizontal' ? 'flex-row space-x-4' : 'flex-col space-y-4'
      } ${className}`}
    >
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.url}
          target='_blank'
          rel='noopener noreferrer'
          className='flex items-center group transition-colors duration-200'
          aria-label={link.name}
        >
          <div className='relative'>
            <div
              className={`${iconClassName} transition-colors duration-200`}
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`,
                fill: defaultColor,
              }}
            >
              {link.icon}
            </div>
            <div
              className='absolute inset-0 bg-current opacity-0  transition-opacity duration-200 '
              style={{ color: hoverColor }}
            />
          </div>
          {showLabels && (
            <span
              className={`ml-2 text-sm font-medium transition-colors duration-200 ${labelClassName}`}
              style={{ color: defaultColor }}
            >
              {link.name}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
