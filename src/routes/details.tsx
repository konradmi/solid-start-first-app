import { createSignal, createResource } from "solid-js"

const getPost = async () => {
  console.log('fetching post')
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return (await response.json()).body
}
 
export const route = {
  load: () => getPost()
};

const Details = (props) => {
  const [blog] = createResource(() => getPost())
  const [count, setCount] = createSignal(0);
  return (
    <div>
      <h1>Details</h1>
      <h2>Count: {count()}</h2>
      <div>{blog() && JSON.stringify(blog())}</div>
      <button onClick={() => setCount(count() + 10)}>Increment</button>
    </div>
  );
}

export default Details

