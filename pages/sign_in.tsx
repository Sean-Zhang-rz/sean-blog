import axios, { AxiosResponse } from 'axios';
import { withSession } from 'lib/withSession';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useCallback, useState } from 'react';
import { User } from 'src/entity/User';
import { Form } from './components/Form';

interface SignInProps {
  username: string;
  password: string;
}
const SignIn: NextPage<{ user: User }> = (props) => {
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
      {props.user ? (
        <div>当前登录用户为{props.user.username}</div>
      ) : (
        <div>
          <h1>登录</h1>
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
            ]}
            buttons={
              <>
                <button type="submit">登录</button>
              </>
            }
          />
        </div>
      )}
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser') || '';

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  }
);
