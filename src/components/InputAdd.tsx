import { useState } from 'react';


interface IInputAddProps {
  onAdd(value: string): void;
}
export const InputAdd = (props: IInputAddProps) => {
  const [value, setValue] = useState('');


  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={() => { props.onAdd(value); setValue(''); }}>
        Adicionar
      </button>
    </div>
  );
}
