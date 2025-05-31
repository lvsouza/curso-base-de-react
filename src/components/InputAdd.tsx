import { useState } from 'react';

import InputAddStyles from './InputAdd.module.css';


interface IInputAddProps {
  onAdd(value: string): void;
}
export const InputAdd = (props: IInputAddProps) => {
  const [value, setValue] = useState('');


  const handleAdd = () => {
    props.onAdd(value);
    setValue('');
  }


  return (
    <div className={InputAddStyles.Container}>
      <input
        value={value}
        className={InputAddStyles.Input}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={handleAdd} className={InputAddStyles.Button}>
        Adicionar
      </button>
    </div>
  );
}
