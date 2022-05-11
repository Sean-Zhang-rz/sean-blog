import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from 'styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.cover}>
      <Image src={'/blog_logo.png'} alt="" width="120" height="120" />
      <h1>Sean的个人博客</h1>
      <p>停止平庸，不断成长</p>
      <p>
        <Link href="/posts">
          <a>文章列表</a>
        </Link>
      </p>
    </div>
  );
};

export default Home;
