import React from 'react';
import { useField } from 'formik';

interface TextAreaProps {
  styles: string;
  name: string;
  placeholder: string;
  rows: number;
  text: string;
}

export const TextArea = ({styles, text, ...props}: TextAreaProps) => {
  const [field, meta] = useField(props);
  return (
    <section className="form-group my-1">
      <textarea className={styles} {...field} {...props}></textarea>
      <small className="form-text text-muted">{text}</small>
      {meta.touched && meta.error && (
        <span className="text-danger text-center"> {meta.error} </span>
      )}
    </section>
  );
}
