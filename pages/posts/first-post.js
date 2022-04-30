import React, { useCallback } from 'react';
import Link from 'next/link';

export default function X() {
  const clickMe = useCallback(() => {
    console.log('click me');
  }, []);
  return (
    <>
      {/* <Head>
      <title>第一篇文章</title>
    </Head> */}
      <div>
        First Post
        <button onClick={clickMe}>点击我</button>
        <hr />
        回到首页{' '}
        <Link href="/">
          <a>点击这里</a>
        </Link>
      </div>
    </>
  );
}
