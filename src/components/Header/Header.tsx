import type { ReactNode } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import HamburgerMenu from '../HamburgerMenu';
import MobileNav from '../MobileNav';
import MobileNavContent from '../MobileNavContent';

type LinkItemProps = {
  to: string;
  children: ReactNode;
};

const LinkItem = ({ to, children }: LinkItemProps) => {
  return (
    <NavLink 
      className={({ isActive }) => (`px-6 py-2 space-x-1 hover:bg-gray-700 rounded ${isActive ? 'text-white' : 'text-gray-400'}`)}
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default function Header() {
  const [opened, toggle] = useState(false);

  const toggleNav = () => {
    toggle(opened => !opened)
  };

  return (
    <header className="mx-auto p-6 md:p-10 h-[90px] w-full max-w-[1200px] flex items-center sm:justify-between text-white relative z-10">
      <div className="flex items-center">
        <HamburgerMenu onClick={toggleNav} />
        <h1 className="text-3xl font-bold">Weather</h1>
      </div>
    
      <div className="hidden text-xl sm:block">
        <LinkItem to="/">天氣</LinkItem>
        <LinkItem to="/rains">雨量</LinkItem>
      </div>

      <MobileNav />
      {createPortal(<MobileNavContent opened={opened} onClick={toggleNav}/>, document.body)}
    </header>
  );
}