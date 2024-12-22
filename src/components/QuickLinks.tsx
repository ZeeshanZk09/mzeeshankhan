import Link from 'next/link'
import React from 'react'
export const navLinks = [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Me" },
      { href: "/services", label: "Services" },
      { href: "/projects", label: "Projects" },
      { href: "/templates", label: "Testimonials" },
    ];
const QuickLinks = ({navClassName, ulClassName, liClassName}: { navClassName?: string, ulClassName? : string, liClassName?: string }) => {

  return (
    <nav className={`${navClassName}overflow-hidden  z-50 `}>
          <ul className={`${ulClassName} flex     `}>
            {navLinks.map(({ href, label }, index) => (
              <li key={index} className='m-0'>
                <Link
                  href={href}
                  className={`  ${liClassName} font-satoshiRegular  font-normal hover:underline leading-6  sm:text-[0.667rem] md:text-[0.778rem] text-black lg:text-[1rem] xl:text-[1.278rem] 2xl:text-[1.556rem] `}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
  )
}

export default QuickLinks
