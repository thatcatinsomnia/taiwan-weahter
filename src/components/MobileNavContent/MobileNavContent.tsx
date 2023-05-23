import type { ReactNode } from 'react';
import { FiX } from 'react-icons/fi'
import { NavLink } from 'react-router-dom';

type Props = {
  opened: boolean; 
  onClick: () => void;
};

const LinkItem = ({ to, children }: {
  to: string;
  children: ReactNode;
}) => {
  const baseClasses = 'p-2 w-full h-14 flex items-center justify-center text-white rounded transition-colors';

  return (
    <li className="px-4 mb-2">
      <NavLink
        className={
          ({ isActive }) => (`${baseClasses} ${isActive ? 'text-white bg-slate-800' : 'text-gray-400 hover:bg-slate-800/30'}`)
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default function MobileNavContent({ opened, onClick }: Props) {
  const contentClasses = opened ? 'translate-x-[0]' : '-translate-x-full';
  const overlayClasses = opened ? 'opacity-70 pointer-events-auto' : 'opacity-0 pointer-events-none'

  return (
    <>
      <div className={`sm:hidden bg-gray-900 fixed inset-0 transition-opacity ${overlayClasses}`} onClick={onClick}></div>
      <div className={`sm:hidden w-[280px] h-full fixed  top-0 left-0 bg-slate-700 shadow-sm transition-transform ${contentClasses}`}>
        <button 
          className="p-1 absolute right-3 top-3 hover:bg-slate-800/50 transition-colors"
          onClick={onClick}
        >
          <FiX size={24} color="white" />
        </button>


        <ul className="pt-28 flex flex-col">
          <LinkItem to="/">天氣</LinkItem>
          <LinkItem to="/rains">雨量</LinkItem>
        </ul>
      </div>
    </>
  );
}

