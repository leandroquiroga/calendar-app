import React from 'react';
import { useField } from 'formik';

export interface InputProps {
  label: string;
  name: string;
  styles: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  errorTitle?: boolean;
  [x: string]: any
};

export const Input = ({
  label,
  styles,
  errorTitle,
  ...props
}: InputProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <section className="mb-3 d-flex flex-column">
      <label htmlFor={props.id || props.name} className="fw-normal form-label">
        {label}
      </label>
      <input
        className={`${styles} ${!errorTitle && "form_modal__field-error"}`}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <span className="text-danger text-center"> {meta.error} </span>
      )}
    </section>
  );
};
