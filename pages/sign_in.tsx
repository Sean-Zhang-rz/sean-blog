import axios, { AxiosResponse } from 'axios';
import { useForm } from 'hooks/useForm';
import { withSession } from 'lib/withSession';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { User } from 'src/entity/User';

const SignIn: NextPage<{ user: User }> = (props) => {
  const onSubmit = (formData: typeof initFormData) => {
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
  };

  const initFormData = { username: '', password: '' };
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
