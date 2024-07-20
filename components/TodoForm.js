import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import { createTask, updateTask } from '../utils/data/todoData';

const initialState = {
  title: '',
  description: '',
  completed: false,
  temporary_field: false,
};

const TodoForm = ({ taskObject }) => {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (taskObject && taskObject.id) {
      setFormInput(taskObject);
    }
  }, [taskObject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskObject.id) {
      updateTask(taskObject.id, formInput)
        .then(() => router.push('/todos'))
        .catch((error) => {
          console.error('Error updating this task: ', error);
        });
    } else {
      createTask(formInput)
        .then(() => router.push('/todos'))
        .catch((error) => {
          console.error('Error creating this task: ', error);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <FormLabel>Task Title</FormLabel>
        <Form.Control
          type="text"
          placeholder="Title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <FormLabel>Description</FormLabel>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Completed"
          name="completed"
          checked={formInput.completed}
          onChange={(e) => setFormInput((prevState) => ({
            ...prevState,
            completed: e.target.checked,
          }))}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

TodoForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  taskObject: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    completed: PropTypes.bool,
    temporary_field: PropTypes.bool,
  }),
};

TodoForm.defaultProps = {
  taskObject: initialState,
};
export default TodoForm;
