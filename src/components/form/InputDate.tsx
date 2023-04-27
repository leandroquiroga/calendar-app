import React from 'react'
import DateTimePicker from 'react-datetime-picker';

interface InputDateProps {
  label: string;
  styles: string;
  handleDateChage: (e: any) => void;
  minDate?: Date;
  placeholder: string;
  date: Date;
}

export const InputDate = ({label, date, handleDateChage, placeholder, styles}: InputDateProps) => {
  return (
    <section className="form-group my-1">
      <label className="form-label">{label}</label>
      <DateTimePicker
        className={styles}
        onChange={handleDateChage}
        placeholder={placeholder}
        value={date}
      />
    </section>
  );
}
