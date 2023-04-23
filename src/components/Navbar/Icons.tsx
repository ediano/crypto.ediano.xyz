'use client';

import { GithubLogo, CaretDown } from 'phosphor-react';

type Props = {
  size?: number;
  className?: string;
};

export function GithubIco({ size = 22, className = '' }: Props) {
  return <GithubLogo size={size} className={className} />;
}

export function CaretDownIco({ size = 22, className = '' }: Props) {
  return <CaretDown size={size} className={className} />;
}
