import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { Post } from 'src/entity/Post';
import { marked } from 'marked';
import styles from './Id.module.css';

interface Props {
  posts: Post;
}
const PostsShow: NextPage<Props> = ({ posts }) => (
  <div className={styles.wraper}>
    <header>
      <h1 className={styles.title}>{posts.title}</h1>
      <Link href="/posts/[id]/edit" as={`/posts/${posts.id}/edit`}>
        <a>编辑</a>
      </Link>
    </header>
    <article
      className={styles.markdown_body}
      dangerouslySetInnerHTML={{ __html: marked(posts.content) }}
    ></article>
  </div>
);

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
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.findOne(Post, context.params.id);

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
