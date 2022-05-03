import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import { Form } from './components/Form';

interface SignUpProps {
  username: string;
  password: string;
  passwordConfirmation: string;
}
const SignUp: NextPage = () => {
  const [formData, setFormData] = useState<SignUpProps>({
    username: '',
    password: '',
    passwordConfirmation: '',
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    passwordConfirmation: [],
  });
  const submit = useCallback(() => {
    axios.post(`/api/v1/users`, formData).then(
      () => {
        window.alert('注册成功');
        window.location.href = '/sign_in';
      },
      (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) setErrors(() => response.data);
        }
      }
    );
  }, [formData]);
  const onChange = useCallback(
    (k: string, v: string) => {
      setFormData({ ...formData, [k]: v });
    },
    [formData]
  );

  return (
    <>
      <h1>注册</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        fields={[
          {
            label: '用户名',
            onChange: (e) => onChange('username', e.target.value),
            errors: errors.username,
          },
          {
            label: '密码',
            type: 'password',
            onChange: (e) => onChange('password', e.target.value),
            errors: errors.password,
          },
          {
            label: '确认密码',
            type: 'password',
            onChange: (e) => onChange('passwordConfirmation', e.target.value),
            errors: errors.passwordConfirmation,
          },
        ]}
        buttons={
          <>
            <button type="submit">注册</button>
          </>
        }
      />
    </>
  );
};

export default SignUp;
