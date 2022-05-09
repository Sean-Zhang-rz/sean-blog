import Link from 'next/link';

interface usePagerProps {
  count: number;
  page: number;
  totalPage: number;
  onChange?: (n: number) => void;
}
export const usePager = (options: usePagerProps) => {
  const { count, page, totalPage } = options;
  const pager = (
    <div>
      {page !== 1 ? (
        <Link href={`?page=${page - 1 || 1}`}>
          <a>上一页 </a>
        </Link>
      ) : null}
      共 {count} 篇文章，当前是第 {page} / {totalPage || 1} 页
      {page < totalPage ? (
        <Link href={`?page=${page + 1}`}>
          <a> 下一页</a>
        </Link>
      ) : null}
    </div>
  );

  return { pager };
};

export default usePager;
