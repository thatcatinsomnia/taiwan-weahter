import type { ReactNode, ComponentProps } from 'react';

type Props = {
  children: ReactNode;
} & ComponentProps<'select'>;

export default function Select({ children, className, ...delegated }: Props) {
  return (
    <div className={`mb-4 w-full sm:max-w-[440px] relative dark:text-gray-50 ${className}`}>
      <select
        className="px-6 py-3 w-full border dark:bg-neutral-900/80 border-neutral-700 rounded-md shadow-lg backdrop-blur pointer-events-auto appearance-none"
        {...delegated}
      >
        {children}
      </select>

      <span className="w-12 absolute top-0 right-0 bottom-0 flex items-center justify-center">
        <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </span>
    </div>
  );
}