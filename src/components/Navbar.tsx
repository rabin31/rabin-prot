'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work /', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Resources', href: '/resources' },
    { label: 'Notes', href: '/notes' },
    { label: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className={`w-full h-16 flex items-center justify-center fixed top-0 left-0 z-50 mt-2 sm:mt-4`}>
      <div className={`px-2 sm:px-4 py-2 rounded-full ${
        isScrolled ? 'bg-[#FFFFFF]/60 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-center text-xs sm:text-sm md:text-md font-matter font-semibold">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 sm:px-4 md:px-6 py-2 rounded-full whitespace-nowrap ${
                  active
                    ? 'bg-white text-[#4C6763] shadow-sm'
                    : isScrolled
                      ? 'text-[#4C6763] hover:text-[#3a524e]'
                      : 'text-[#4C6763] hover:text-[#3a524e]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;