import React, { Dispatch, SetStateAction } from 'react';

export interface ButtonsProps {
  type: "submit" | "reset" | "button";
  value?: string;
  styles?: string;
  disable: boolean;
};

export const Button = ({
  type,
  styles,
  disable,
  value,
}: ButtonsProps): JSX.Element => {

  console.log(disable)
  return (
    <button disabled={disable} type={type} className={styles}>
      {" "}
      {value}{" "}
    </button>
  );
};