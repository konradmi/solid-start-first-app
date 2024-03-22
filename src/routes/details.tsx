import { createSignal } from "solid-js"
import { cache, createAsync } from "@solidjs/router"

const getPost = cache(async () => {
  console.log('fetching post')
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return (await response.json()).body
}, 'post')
 
export const route = {
  load: () => getPost()
};

const Details = (props) => {
  const text = createAsync(() => getPost())
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <h1>Details</h1>
      <h2>Count: {count()}</h2>
      <div>{text() && JSON.stringify(text())}</div>
      <button onClick={() => setCount(count() + 10)}>Increment</button>
    </div>
  );
}

export default Details

