import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { Post } from 'src/entity/Post';
import { UAParser } from 'ua-parser-js';
import styles from 'styles/Home.module.css';

interface Props {
  posts: Post[];
  browser: {
    name: string;
    version: string;
    major: string;
  };
}

const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props;

  return (
    <div>
      <h1 className={styles.container}>文章列表</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`}>
            <a>{p.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection();
  const posts = await connection.manager.find(Post);

  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};
