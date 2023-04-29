'use client';

import { Slot } from '@radix-ui/react-slot';
import classnames from 'classnames';

import type { Props } from './index';

export function ButtonUseClient({
  asChild,
  children,
  className = '',
  isHover = true,
  isOutline = false,
  rounded = 'default',
  color = 'default',
  ...props
}: Props) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      {...props}
      className={classnames(
        'flex gap-2 items-center justify-center shadow-lg p-2 uppercase font-medium transition-all',
        rounded === 'default' && 'rounded-md w-full h-12',
        rounded === 'full' && 'rounded-full max-w-[3rem] min-w-[3rem] h-12',
        isOutline && 'border',

        isHover && !isOutline && 'hover:text-white',
        isHover && !isOutline && color === 'default' && 'bg-slate-600 hover:bg-slate-800',
        isHover && !isOutline && color === 'close' && 'bg-red-600 hover:bg-red-800',
        isHover && !isOutline && color === 'success' && 'bg-green-600 hover:bg-green-800',
        isHover && !isOutline && color === 'alert' && 'bg-yellow-600 hover:bg-yellow-800',
        isHover && !isOutline && color === 'info' && 'bg-blue-600 hover:bg-blue-800',
        isHover && !isOutline && color === 'white' && 'bg-white hover:bg-gray-800',

        !isHover && !isOutline && color === 'default' && 'bg-slate-600',
        !isHover && !isOutline && color === 'close' && 'bg-red-600',
        !isHover && !isOutline && color === 'success' && 'bg-green-600',
        !isHover && !isOutline && color === 'alert' && 'bg-yellow-600',
        !isHover && !isOutline && color === 'info' && 'bg-blue-600',
        !isHover && !isOutline && color === 'white' && 'bg-white',

        isHover && isOutline && color === 'default' && 'border-slate-600 hover:border-slate-800 hover:text-slate-800',
        isHover && isOutline && color === 'close' && 'border-red-600 hover:border-red-800 hover:text-red-800',
        isHover && isOutline && color === 'success' && 'border-green-600 hover:border-green-800 hover:text-green-800',
        isHover && isOutline && color === 'alert' && 'border-yellow-600 hover:border-yellow-800 hover:text-yellow-800',
        isHover && isOutline && color === 'info' && 'border-blue-600 hover:border-blue-800 hover:text-blue-800',
        isHover && isOutline && color === 'white' && 'border-white hover:border-gray-800 hover:text-gray-800',

        !isHover && isOutline && color === 'default' && 'border-slate-600 hover:text-slate-800',
        !isHover && isOutline && color === 'close' && 'border-red-600 hover:text-red-800',
        !isHover && isOutline && color === 'success' && 'border-green-600 hover:text-green-800',
        !isHover && isOutline && color === 'alert' && 'border-yellow-600 hover:text-yellow-800',
        !isHover && isOutline && color === 'info' && 'border-blue-600 hover:text-blue-800',
        !isHover && isOutline && color === 'white' && 'border-white',

        props.disabled && 'bg-gray-500 cursor-not-allowed',
        className,
      )}
    >
      {children}
    </Component>
  );
}

type ButtonGroupType = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function ButtonGroupUseClient({ children, className = '' }: ButtonGroupType) {
  return <div className={classnames('w-full max-w-lg mx-auto flex flex-row gap-4', className)}>{children}</div>;
}
