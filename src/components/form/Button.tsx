import React, { ReactElement } from 'react';
export interface ButtonsProps {
  type: "submit" | "reset" | "button";
  value?: string;
  styles?: string;
  icon?: string;
  children?: ReactElement | ReactElement[];
};

export const Button = ({
  type,
  styles,
  value,
  icon,
  children,
}: ButtonsProps): JSX.Element => {

  return (
    <button type={type} className={styles}>
      { children && (children) }
      <span>{value}</span>
    </button>
  );
};