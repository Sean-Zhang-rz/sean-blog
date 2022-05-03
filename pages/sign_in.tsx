import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import { useCallback, useState } from 'react';

interface SignInProps {
  username: string;
  password: string;
}
const SignUp: NextPage = () => {
  const [formData, setFormData] = useState<SignInProps>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: [],
    password: [],
  });
  const submit = useCallback(() => {
    axios.post(`/api/v1/sessions`, formData).then(
      () => {
        window.alert('登录成功');
        // window.location.href = '/sign_in';
      },
      (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) setErrors(() => response.data);
        }
      }
    );
    console.log(formData);
  }, [formData]);

  return (
    <>
      <h1>登录</h1>
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
          <button type="submit">登录</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;
