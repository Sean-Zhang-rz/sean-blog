import { ReactNode, useCallback, useState } from 'react';

interface Fields<T> {
  label: string;
  type?: 'text' | 'password' | 'textarea';
  key: keyof T;
}
interface useFormProps<T> {
  initFormData: T;
  fields: Fields<T>[];
  onSubmit: (fd: T) => void;
  buttons: ReactNode;
}

export function useForm<T>(options: useFormProps<T>) {
  const { initFormData, fields, buttons, onSubmit } = options;
  // 非受控组件
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(() => {
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) {
        e[key] = [];
      }
    }
    return e;
  });

  const onChange = useCallback(
    (k: keyof T, v: unknown) => {
      setFormData({ ...formData, [k]: v });
    },
    [formData]
  );
  const _submit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      onSubmit(formData);
    },
    [onSubmit, formData]
  );

  const form = (
    <form onSubmit={_submit}>
      {fields.map(({ label, type = 'text', key }, index) => (
        <div key={index}>
          <label>
            {label}
            {type === 'textarea' ? (
              <textarea
                value={formData[key].toString()}
                onChange={(e) => onChange(key, e.target.value)}
              />
            ) : (
              <input
                type={type}
                value={formData[key].toString()}
                onChange={(e) => onChange(key, e.target.value)}
              />
            )}
          </label>
          {errors[key]?.length > 0 ? <div>{errors[key].join(',')}</div> : null}
        </div>
      ))}
      {buttons}
    </form>
  );

  return {
    form,
    setErrors,
  };
}
