'use client';

import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import { Locale } from '@/config/i18n.config';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  lang: Locale;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ lang, type = 'text', label, error, className = '', ...props }, ref) => {
    const id = props.name?.split(' ').join('') || label?.split(' ').join('');

    return (
      <div className={classnames('w-full flex flex-col gap-2', className)}>
        {!!label && (
          <label htmlFor={id} className="text-white">
            {label}
          </label>
        )}

        <input
          className="w-full border border-zinc-600 bg-transparent text-white shadow-sm rounded h-12 px-2"
          ref={ref}
          id={id}
          type={type}
          {...props}
        />

        {!!error && <span className="text-red-300">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
