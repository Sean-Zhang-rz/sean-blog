import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { getPost, getPostIds } from 'lib/posts';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { Post } from 'src/entity/Post';

interface Props {
  posts: Post;
}
const PostsShow: NextPage<Props> = (props) => {
  const { posts } = props;
  console.log(props);

  return (
    <div>
      <h1>{posts.title}</h1>
      <article>{posts.content}</article>
    </div>
  );
};

export default PostsShow;

// export const getStaticPaths = async () => {
//   const idList = await getPostIds();
//   return {
//     paths: idList.map((id)=>({params:{id}})),

//     fallback: false
//   }
// }

// export const getStaticProps = async (params: any) => {
//   const {id} = params.params;
//   const post = await getPost(id)
//   return {
//     props: {
//       post
//     }
//   }
// }

export const getServerSideProps: GetServerSideProps<any, { id: string }> = async (context) => {
  context.params.id;
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.findOne(Post, context.params.id);
  // console.log(posts);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
