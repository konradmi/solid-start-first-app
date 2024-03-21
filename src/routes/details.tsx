import { createSignal, createResource } from "solid-js"
import type { RouteDefinition } from "@solidjs/router";

const fetchTodosFirst = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const json = await response.json()
    return json
}

export const route = {
  load: () => fetchTodosFirst(),
} satisfies RouteDefinition

const Details = (props) => {
  const [blog] = createResource(() => fetchTodosFirst())
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

