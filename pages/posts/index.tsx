import { Post, usePosts } from "hooks/usePosts";
import getPosts from "lib/posts";
import { NextPage } from "next";


interface Props {
  posts: Post[]
}
const PostsIndex: NextPage<Props> = (props)=>{
  console.log(props.posts);
  const {posts} = props;
  
  
  return (
    <div>
      <h1>文章列表</h1>
      {
        posts.map((p)=>(<div key={p.id}>{p.id}</div>))
      }
    </div>
  )
}
export default PostsIndex;

export const getStaticProps = async () => {

  const posts = await getPosts()
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  }
}