import React from 'react';
export interface ButtonsProps {
  type: "submit" | "reset" | "button";
  value?: string;
  styles?: string;
};

export const Button = ({
  type,
  styles,
  value,
}: ButtonsProps): JSX.Element => {

  return (
    <button type={type} className={styles}>
      {" "}
      {value}{" "}
    </button>
  );
};