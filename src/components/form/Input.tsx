import React from 'react';
import { useField } from 'formik';

export interface InputProps {
  label: string;
  name: string;
  styles: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  [x: string]: any
};

export const Input = ({
  label,
  styles,
  ...props
}: InputProps): JSX.Element => {
  const [field, meta] = useField(props);


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
