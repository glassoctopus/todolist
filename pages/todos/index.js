import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getTasks } from '../../utils/data/todoData';
import TodoTable from '../../components/TodoTable';
import { useAuth } from '../../utils/context/authContext';

function Todo() {
  const [todos, setTodos] = useState([]);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Todo List</h2>
        <Link href="/todos/new" passHref>
          <Button variant="primary">
            New Task
          </Button>
        </Link>
      </div>
      <TodoTable todos={todos} />
    </article>
  );
}

export default Todo;
