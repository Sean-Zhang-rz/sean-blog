import { ChangeEventHandler, FC, FormEventHandler, ReactNode } from 'react';

interface FormProps {
  fields: {
    label: string;
    type?: 'text' | 'password';
    value?: string | number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    errors?: string[];
  }[];
  onSubmit: FormEventHandler;
  buttons: ReactNode;
}
export const Form: FC<FormProps> = ({ fields, onSubmit, buttons }) => {
  return (
    <form onSubmit={onSubmit}>
      {fields.map(({ label, type = 'text', value, onChange, errors }, index) => (
        <div key={index}>
          <label>
            {label}
            <input type={type} value={value} onChange={onChange} />
          </label>
          {errors?.length > 0 ? <div>{errors.join(',')}</div> : null}
        </div>
      ))}
      {buttons}
    </form>
  );
};
