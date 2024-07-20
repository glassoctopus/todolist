import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import TodoCard from '../../components/TodoCard'; // Assuming you have a TodoCard component
import { getSingleTask } from '../../utils/data/todoData'; // Adjust import based on your file structure

const Todo = () => {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getSingleTask(id).then((data) => setTask(data));
    }
  }, [id]);

  if (!task) {
    return <p>Loading...</p>;
  }

  const handleEditTask = () => {
    router.push(`/todos/update/${id}`);
  };

  return (
    <article className="todos">
      <h1>Todo</h1>
      <Button onClick={handleEditTask}>
        Edit this Todo
      </Button>

      <section key={`todo--${task.id}`} className="todo">
        <TodoCard
          title={task.title || 'Untitled Task'}
          description={task.description || 'No description available'}
          completed={task.completed ? 'Completed' : 'Incomplete'}
          temporary_field={task.temporary_field ? 'Temporary' : 'Permanent'}
          id={id}
        />
      </section>
    </article>
  );
};

export default Todo;
