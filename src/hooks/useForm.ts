import { ChangeEvent, useState,  } from 'react';


export const useForm = (intialValue = {}) => {

  const [value, setValue] = useState(intialValue)

  // Resetea el formulario
  const resetForm = () => setValue(intialValue);

  // Permite cargar valores al formulario
  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  return [value, handleChange, resetForm];
}