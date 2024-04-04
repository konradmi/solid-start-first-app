import { For } from "solid-js";
import { cache, createAsync } from "@solidjs/router"
import { Title } from "@solidjs/meta"

import { Post } from "~/types";

const getPosts = cache(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/")
  console.log('posts have been fetched')
  return (await response.json()) as Post[]
}, 'posts')
 
export const route = {
  load: () => getPosts()
};


export default function Home() {
  const posts = createAsync(() => getPosts())
  return (
    <main>
      <Title>Posts</Title>
      <For each={posts()} fallback={<div>Loading...</div>}>
        {(post) => {
          return (
              <div>
                <a href={`/post/${post.id}`}>
                  <h1>{post.title}</h1>
                </a>
                <p>{post.body}</p>
              </div>
          )
        }}
      </For>
    </main>
  );
}
