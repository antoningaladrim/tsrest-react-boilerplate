import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

export const Button = ({ children, onClick, className }: ButtonProps) => (
  <button onClick={onClick} className={className}>
    {children}
  </button>
);
