import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TodoForm from '../../../components/TodoForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleTask } from '../../../utils/data/todoData';

const UpdateTask = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [task, setTask] = useState({});

  useEffect(() => {
    if (id) {
      getSingleTask(id).then(setTask);
    }
  }, [id]);

  return (
    <div>
      <h2>Update Task</h2>
      {task && <TodoForm user={user} taskObject={task} />}
    </div>
  );
};

export default UpdateTask;
