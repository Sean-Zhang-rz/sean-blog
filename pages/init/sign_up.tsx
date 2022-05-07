import axios, { AxiosResponse } from 'axios';
import { useForm } from 'hooks/useForm';
import { NextPage } from 'next';
import initApi from './api/init';

const SignUp: NextPage = () => {
  const onSubmit = (formData: typeof initFormData) => {
    initApi.signUp(formData).then(
      () => {
        window.alert('注册成功');
        window.location.href = '/init/sign_in';
      },
      (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) setErrors(() => response.data);
        }
      }
    );
  };

  const initFormData = { username: '', password: '', passwordConfirmation: '' };
  const { form, setErrors } = useForm({
    initFormData,
    fields: [
      {
        label: '用户名',
        key: 'username',
      },
      {
        label: '密码',
        type: 'password',
        key: 'password',
      },
      {
        label: '确认密码',
        type: 'password',
        key: 'passwordConfirmation',
      },
    ],
    buttons: <button type="submit">注册</button>,
    onSubmit,
  });

  return (
    <>
      <h1>注册</h1>
      {form}
    </>
  );
};

export default SignUp;
