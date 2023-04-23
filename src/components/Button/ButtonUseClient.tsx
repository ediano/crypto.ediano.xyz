'use client';

import { ButtonHTMLAttributes } from 'react';
import classnames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function ButtonUseClient({ children, className = '', ...props }: Props) {
  return (
    <button
      className={classnames(
        className,
        'w-full max-w-xs border border-zinc-600 hover:border-zinc-800 hover:bg-zinc-800 rounded shadow-sm px-12 py-4',
      )}
      {...props}
    >
      {children}
    </button>
  );
}
