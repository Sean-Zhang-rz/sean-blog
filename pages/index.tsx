import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, NextPage } from 'next';
import { Post } from 'src/entity/Post';
import { UAParser } from 'ua-parser-js';
import styles from '../styles/Home.module.css';

interface Props {
  posts: Post[];
  browser: {
    name: string;
    version: string;
    major: string;
  };
}

const Index: NextPage<Props> = (props) => {
  const { posts } = props;

  return (
    <div>
      <h1 className={styles.container}>你的浏览器是 {props.browser.name}</h1>
      {posts.map((p, index) => {
        return <div key={index}>{p.title}</div>;
      })}
    </div>
  );
};

export default Index;

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
