import React from 'react';
import TodoForm from '../../components/TodoForm';
import { useAuth } from '../../utils/context/authContext';

const NewTask = () => {
  const { user } = useAuth();
  return (
    <div className="new-task-container">
      <div className="new-task-content">
        <h2>Create a new Todo</h2>
        <TodoForm user={user} />
      </div>
    </div>
  );
};

export default NewTask;
