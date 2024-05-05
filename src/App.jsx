import { useDispatch, useSelector } from "react-redux";
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "./api/apiSlice";
import "./App.css";
import {
  decrement,
  increment,
  incrementByAmount,
} from "./store/counter/counter-reducer";
import { useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const count = useSelector((state) => state.counter.value);

  const { data, error, isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { id: Date.now().toString(), title, complete: false };
    addTodo(data);
    setTitle("");
  };

  const onUpdate = (e, id) => {
    e.preventDefault();
    const data = { id, title, complete: false };
    updateTodo(data);
    setTitle("");
  };

  if (error) return <h1>{error}</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <input
            placeholder="Add"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </div>
      {data?.map((todo) => (
        <div
          key={todo.id}
          style={{ display: "flex", alignItems: "center", gap: 20 }}
        >
          <h1>{todo.title}</h1>
          <form onSubmit={(e) => onUpdate(e, todo.id)}>
            <input
              placeholder="update"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <button onClick={() => deleteTodo(todo.id)}>delete</button>
        </div>
      ))}
      <button onClick={() => dispatch(increment())}>increment</button>
      <h1>{count}</h1>
      <button onClick={() => dispatch(decrement())}>increment</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        increment By 5
      </button>
    </div>
  );
};

export default App;
