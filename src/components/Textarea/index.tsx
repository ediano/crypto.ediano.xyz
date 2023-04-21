'use client';

import React, { TextareaHTMLAttributes } from 'react';
import classnames from 'classnames';

import { Locale } from '@/config/i18n.config';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  lang: Locale;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ lang, label, error, className = '', ...props }, ref) => {
    const id = props.name?.split(' ').join('') || label?.split(' ').join('');

    return (
      <div className={classnames('w-full flex flex-col gap-2', className)}>
        {!!label && (
          <label htmlFor={id} className="text-white">
            {label}
          </label>
        )}

        <textarea
          className="w-full min-h-[120px] border border-zinc-600 bg-transparent text-white shadow-sm rounded h-12 p-2"
          ref={ref}
          id={id}
          {...props}
        ></textarea>

        {!!error && <span className="text-red-300">{error}</span>}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
