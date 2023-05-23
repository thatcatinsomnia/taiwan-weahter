import { ReactNode } from 'react';
import Header from '../Header';

type Props = {
  children: ReactNode;
};

export default function BaseLayout({ children }: Props) {
  return (
    <div className="w-full min-h-full dark:bg-gray-800">
      <Header />
      <div className="w-full h-[calc(100%-90px)]">
        <div className="p-6 md:p-10 mx-auto w-full max-w-[1200px] h-full dark:text-gray-50 relative">
          {children}
        </div>
      </div>
    </div>
  );
}