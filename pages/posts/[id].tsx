import { Post } from "hooks/usePosts";
import { getPost, getPostIds } from "lib/posts";
import { NextPage } from "next";
import React from "react";

interface Props{
  post: Post
}
const PostsShow: NextPage<Props> = (props) => {
  const {post} = props;

  return (
    <div>
      <h1>{post.title}</h1>
      <article>
        {post.content}
      </article>
    </div>
  )
}

export default PostsShow;

export const getStaticPaths = async () => {
  const idList = await getPostIds();
  return {
    paths: idList.map((id)=>({params:{id}})),

    fallback: false
  }
}

export const getStaticProps = async (params: any) => {
  const {id} = params.params;
  const post = await getPost(id)
  return {
    props: {
      post
    }
  }
}