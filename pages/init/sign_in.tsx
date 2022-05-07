import axios, { AxiosResponse } from 'axios';
import { useForm } from 'hooks/useForm';
import { withSession } from 'lib/withSession';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { User } from 'src/entity/User';
import initApi from '../../api/init';
import SignInProps from '../../api/types/init';

const SignIn: NextPage<{ user: User }> = (props) => {
  // submit暂不优化
  const onSubmit = (formData: SignInProps) => {
    initApi.signIn(formData).then(
      () => {
        window.alert('登录成功');
        const query = window.location.search.split('?').pop();
        const params = new URLSearchParams(query);
        if (params.has('returnTo')) {
          window.location.href = params.get('returnTo');
        }
      },
      (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) setErrors(() => response.data);
        }
      }
    );
  };

  const { form, setErrors } = useForm({
    initFormData: { username: '', password: '' },
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
    ],
    buttons: <button type="submit">登录</button>,
    onSubmit,
  });

  return (
    <>
      {props.user ? (
        <div>当前登录用户为{props.user.username}</div>
      ) : (
        <div>
          <h1>登录</h1>
          {form}
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
