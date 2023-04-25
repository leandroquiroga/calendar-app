import { ChangeEvent, useState,  } from 'react';

export const useForm = <T> (intialValue: T) => {
  const [value, setValue] = useState(intialValue);

  // Resetea el formulario
  const resetForm = () => setValue(intialValue);

  // Permite cargar valores al formulario
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return [value, handleChange, resetForm];
};