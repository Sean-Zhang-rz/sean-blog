import { useForm } from 'hooks/useForm';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { withSession } from 'lib/withSession';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Post } from 'src/entity/Post';
import postApi from '../../../api/post';
import PostProps from '../../../api/types/post';

interface Props {
  id: number;
  post: Post;
}

const PostEdit: NextPage<Props> = (props) => {
  const router = useRouter();
  const onSubmit = (formData: PostProps) => {
    postApi
      .postsNew({ post: formData, id })
      .then(() => {
        window.alert('发布成功');
        router.back();
      })
      .catch((e) => {
        setErrors(e.message);
      });
  };

  const { post, id } = props;

  const { form, setErrors } = useForm<PostProps>({
    initFormData: { title: post.title, content: post.content },
    fields: [
      {
        label: '标题',
        key: 'title',
      },
      {
        label: '内容',
        type: 'textarea',
        key: 'content',
      },
    ],
    buttons: <button type="submit">发布</button>,
    onSubmit,
  });

  return (
    <div>
      <h1>文章发布</h1>
      {form}
    </div>
  );
};

export default PostEdit;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const { id } = context.params;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne('Post', id);

    return {
      props: {
        id: parseInt(id.toString()),
        post: JSON.parse(JSON.stringify(post)),
      },
    };
  }
);
