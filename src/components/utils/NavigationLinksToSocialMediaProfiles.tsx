import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface SocialMediaLink {
  name: string;
  url: string;
  icon: string;
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
    icon: '/assets/images/social-icons/linkedIn.svg',
  },
  {
    name: 'Upwork',
    url: 'https://www.upwork.com/freelancers/~01ac7dbd1886628aad',
    icon: '/assets/images/social-icons/upwork.svg',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/ZeeshanZk09',
    icon: '/assets/images/social-icons/github.svg',
  },
  // {
  //   name: 'YouTube',
  //   url: 'https://www.youtube.com/@pnacampus.5081',
  //   icon: '/assets/images/social-icons/youtube.svg',
  // },
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
}: Readonly<NavigationLinksToSocialMediaProfilesProps>) {
  return (
    <nav
      className={`w-fit flex justify-center items-center ${
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
              }}
            >
              <Image
                src={link.icon}
                alt={`${link.name} icon`}
                width={iconSize}
                height={iconSize}
                className='w-full h-full object-contain'
              />
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
