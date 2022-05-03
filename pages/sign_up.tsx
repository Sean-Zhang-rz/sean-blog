import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import { useCallback, useState } from 'react';

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

  return (
    <>
      <h1>注册</h1>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div>
          <label>
            用户名
            <input
              type="text"
              value={formData.username}
              onChange={(e) => {
                setFormData((preV) => ({ ...preV, username: e.target.value }));
              }}
            />
          </label>
          {errors.username?.length > 0 ? <div>{errors.username.join(',')}</div> : null}
        </div>
        <div>
          <label>
            密码
            <input
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData((preV) => ({ ...preV, password: e.target.value }));
              }}
            />
          </label>
          {errors.password?.length > 0 ? <div>{errors.password.join(',')}</div> : null}
        </div>
        <div>
          <label>
            确认密码
            <input
              type="password"
              value={formData.passwordConfirmation}
              onChange={(e) => {
                setFormData((preV) => ({ ...preV, passwordConfirmation: e.target.value }));
              }}
            />
          </label>
          {errors.passwordConfirmation?.length > 0 ? (
            <div>{errors.passwordConfirmation.join(',')}</div>
          ) : null}
        </div>
        <div>
          <button type="submit">注册</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
