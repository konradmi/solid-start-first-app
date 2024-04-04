import { cache, createAsync, useParams } from "@solidjs/router"

import { Post } from "~/types";

const getPost = cache(async (id: number) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  console.log(`post ${id} have been fetched`)
  return (await response.json()) as Post
}, 'post')
 
export const route = {
  load: ({ params }: { params: { id: string } }) => {
    console.log(`preloading post ${+params.id}`)
    return getPost(+params.id)
  }
};

const SinglePost = () => {
  const { id } = useParams()
  const post = createAsync(() => getPost(+id))

  return (
    <div>
      <h1>Post {post() && post()!.id}</h1>
      <h2>{post() && post()!.title}</h2>
      <p>{post() && post()!.body}</p>
    </div>
  );
}

export default SinglePost

