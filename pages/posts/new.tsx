import axios from 'axios';
import { useForm } from 'hooks/useForm';
import { NextPage } from 'next';

const PostNew: NextPage = () => {
  const onSubmit = (formData: typeof initFormData) => {
    axios
      .post(`/api/v1/posts`, formData)
      .then(() => {
        window.alert('');
      })
      .catch((e) => {
        setErrors(e.response.data);
      });
  };

  const initFormData = { title: '', content: '' };
  const { form, setErrors } = useForm({
    initFormData,
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

export default PostNew;
