import type { ComponentProps } from 'react';
import { FiMenu } from 'react-icons/fi';

export default function HamburgerMenu({ onClick }: ComponentProps<'button'>) {
  return (
    <>
      <button 
        className="sm:hidden mr-4 p-1 hover:bg-slate-700 transition-colors text-white rounded" 
        onClick={onClick}
      >
        <FiMenu className="text-white" size={32} />
      </button>
    </>
  );
}