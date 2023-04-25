import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useField } from 'formik';

export interface InputProps {
  label: string;
  name: string;
  styles: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  setButtonDisabled: Dispatch<SetStateAction<boolean>>
  [x: string]: any
};

export const Input = ({
  label,
  styles,
  setButtonDisabled,
  ...props
}: InputProps): JSX.Element => {
  const [field, meta] = useField(props);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  useEffect(() => {
    field.name === "email" && setEmail(field.value);
    field.name === "password" && setPassword(field.value);
    if ([email, password].includes("")) {    
      setButtonDisabled(true);
      return;
    };
    setButtonDisabled(false);
  }, [email, field, password, setButtonDisabled]);


  return (
    <section className="mb-3 d-flex flex-column">
      <label htmlFor={props.id || props.name} className="fw-normal form-label">
        {label}
      </label>
      <input className={styles} {...field} {...props} />

      {meta.touched && meta.error && (
        <span className="text-danger text-center"> {meta.error} </span>
      )}
    </section>
  );
};
