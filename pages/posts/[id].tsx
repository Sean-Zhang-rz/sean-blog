import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { Post } from 'src/entity/Post';
import { marked } from 'marked';
import styles from './Id.module.css';
import postApi from 'api/post';
import { useRouter } from 'next/router';

interface Props {
  posts: Post;
  id: number;
}
const PostsShow: NextPage<Props> = ({ id, posts }) => {
  const router = useRouter();
  const deletePost = useCallback(() => {
    console.log(id);
    postApi
      .deletePost({ id })
      .then(() => {
        window.alert('删除成功');
        router.back();
      })
      .catch(() => {
        window.alert('删除失败');
      });
  }, [id, router]);

  return (
    <div className={styles.wraper}>
      <header>
        <h1 className={styles.title}>{posts.title}</h1>
        <Link href="/posts/[id]/edit" as={`/posts/${posts.id}/edit`}>
          <a>编辑</a>
        </Link>
        <span className={styles.divider}>|</span>
        <button onClick={deletePost}>删除</button>
      </header>
      <article
        className={styles.markdown_body}
        dangerouslySetInnerHTML={{ __html: marked(posts.content) }}
      ></article>
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
  const connection = await getDatabaseConnection();
  const { id } = context.params;
  const posts = await connection.manager.findOne(Post, id);
  console.log(id);

  return {
    props: {
      id: parseInt(id.toString()),
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
