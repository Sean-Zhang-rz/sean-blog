import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import { Form } from 'pages/components/Form';
import { useCallback, useState } from 'react';

interface PostNewProps {
  title: string;
  content: string;
}
const PostNew: NextPage = () => {
  const [formData, setFormData] = useState<PostNewProps>({
    title: '',
    content: '',
  });

  const [errors, setErrors] = useState({
    title: [],
    content: [],
  });

  const submit = useCallback(() => {
    axios.post(`/api/v1/posts`, formData).then(
      () => {
        window.alert('提交成功');
      },
      (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) setErrors(() => response.data);
        }
      }
    );
    // todo
  }, []);

  const onChange = useCallback(
    (k: string, v: string) => {
      setFormData({ ...formData, [k]: v });
    },
    [formData]
  );

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        fields={[
          {
            label: '标题',
            onChange: (e) => onChange('title', e.target.value),
            errors: errors.title,
          },
          {
            label: '内容',
            type: 'textarea',
            onChange: (e) => onChange('content', e.target.value),
            errors: errors.content,
          },
        ]}
        buttons={
          <>
            <button type="submit">发布</button>
          </>
        }
      />
    </div>
  );
};

export default PostNew;
