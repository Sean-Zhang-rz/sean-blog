import { usePosts } from "hooks/usePosts";
import { NextPage } from "next";

const PostsIndex: NextPage = ()=>{
  const {posts} = usePosts()

  return (
    <div>
      {
        posts.map((p, index) => <div key={index}>{p.id}</div>)
      }
    </div>
  )
}
export default PostsIndex;