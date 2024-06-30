import TodoForm from '../../components/TodoForm';
import { useAuth } from '../../utils/context/authContext';

const NewTask = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Create a new Todo</h2>
      <TodoForm user={user} />
    </div>
  );
};

export default NewTask;
