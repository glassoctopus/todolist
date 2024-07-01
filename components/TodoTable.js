/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { deleteTask } from '../utils/data/todoData';

const TodoTable = ({ todos }) => {
  const router = useRouter();

  const updateThisTodo = (id) => {
    router.push(`/todos/update/${id}`);
  };

  const deleteTodo = (id) => {
    deleteTask(id);
  };

  return (
    <div className="todo-table">
      <h1 className="text-center mb-4">Todos</h1>
      <table className="table">
        <tbody>
          {todos.map((todo) => (
            <tr key={`todo--${todo.id}`}>
              <td>{todo.title}</td>
              <td>{todo.completed ? 'Completed' : 'Incomplete'}</td>
              <td>{todo.description}</td>
              <td>
                <Link href={`/todos/${todo.id}`} passHref>
                  <Button variant="primary" className="m-2">VIEW</Button>
                </Link>
                <Button variant="info" onClick={() => updateThisTodo(todo.id)} className="m-2">
                  EDIT
                </Button>
                <Button variant="danger" onClick={() => deleteTodo(todo.id)} className="m-2">
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TodoTable.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    temporary_field: PropTypes.bool,
  })).isRequired,
};

export default TodoTable;
