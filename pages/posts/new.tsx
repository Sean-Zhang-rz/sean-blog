import { useForm } from 'hooks/useForm';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import postApi from './api/post';
import PostProps from './api/types/post';

const PostNew: NextPage = () => {
  const onSubmit = (formData: PostProps) => {
    postApi
      .postsNew(formData)
      .then(() => {
        window.alert('发布成功');
      })
      .catch((e) => {
        setErrors(e.message);
      });
  };

  const { form, setErrors } = useForm<PostProps>({
    initFormData: { title: '', content: '' },
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
