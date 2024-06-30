import React, { useEffect, useState } from 'react';
import { getTasks } from '../../utils/data/todoData';
import TodoTable from '../../components/TodoTable';
import { useAuth } from '../../utils/context/authContext';

function Todo() {
  const [todos, setTodos] = useState([]);
  // const router = todoouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      getTasks().then((data) => {
        setTodos(data);
      });
    }
  }, [user]);

  return (
    <article className="todo">
      <TodoTable todos={todos} />
    </article>
  );
}

export default Todo;
