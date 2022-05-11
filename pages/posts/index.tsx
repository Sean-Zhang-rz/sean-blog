import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
import { Post } from 'src/entity/Post';
import usePager from 'hooks/usePager';
import { withSession } from 'lib/withSession';
import styles from './Index.module.css';

interface Props {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
  currentUser: {
    id: String;
  };
}

const PostsIndex: NextPage<Props> = (props) => {
  const { currentUser, posts, count, page, totalPage } = props;
  const { pager } = usePager({ count, page, totalPage });

  // console.log(currentUser);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>文章列表（{count}）</h1>
        {currentUser ? (
          <Link href="/posts/new">
            <a>新增文章</a>
          </Link>
        ) : null}
      </header>
      {posts.map((p) => (
        <div key={p.id} className={styles.font}>
          <Link href={`/posts/${p.id}`}>
            <a>{p.title || '默认文章'}</a>
          </Link>
        </div>
      ))}
      <footer>{pager}</footer>
    </div>
  );
};

export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    const query = context.req.url.split('?').pop();
    const params = new URLSearchParams(query);
    const page = parseInt(params.get('page')) || 1;
    const currentUser = (context.req as any).session.get('currentUser') || null;
    const perPage = 6;
    const connection = await getDatabaseConnection();
    const [posts, count] = await connection.manager.findAndCount(Post, {
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        count,
        page,
        currentUser,
        totalPage: Math.ceil(count / perPage),
      },
    };
  }
);
