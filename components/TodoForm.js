import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Form, FormLabel } from 'react-bootstrap';
import { createTask, getSingleTask, updateTask } from '../utils/data/todoData';

const initialState = {
  title: '',
  description: '',
  completed: false,
  temporary_field: false,
};

export default function TodoForm({ taskObject }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);

  useEffect(() => {
    if (taskObject.id) {
      getSingleTask(taskObject.id).then((data) => {
        setFormInput({
          title: data.title,
          description: data.description,
          completed: data.completed,
          temporary_field: data.temporary_field,
        });
      });
    }
  }, [taskObject.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const activateThisTask = () => {
    if (window.confirm(`Activate ${formInput.title} ${taskObject.id}`)) {
      updateTask(taskObject.id);
      window.location.reload();
      router.push('/todos');
    }
  };

  const deactivateThisTask = () => {
    if (window.confirm(`Deactivate ${formInput.title} ${taskObject.id}`)) {
      updateTask(taskObject.id);
      window.location.reload();
      router.push('/todos');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      title: formInput.title,
      description: formInput.description,
      completed: formInput.completed,
      temporary_field: formInput.temporary_field,
    };

    if (!taskObject.id) {
      createTask(task)
        .then(() => router.push('/todo'))
        .catch((error) => {
          console.error('Error creating this task: ', error);
        });
    } else {
      updateTask(task, taskObject.id)
        .then(() => router.push(`/todos/${taskObject.id}`))
        .catch((error) => {
          console.error('Error updating this task: ', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FormLabel>What task do you need to track?</FormLabel>
          <FormLabel controlId="floatingInput1" label="todo" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Todo"
              name="title"
              required
              value={formInput.title}
              onChange={handleChange}
            />
          </FormLabel>

          <FormLabel controlId="floatingInput1" label="description" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              required
              value={formInput.description}
              onChange={handleChange}
            />
          </FormLabel>

          <Button
            variant={formInput.completed ? 'danger' : 'success'}
            onClick={formInput.completed ? deactivateThisTask : activateThisTask}
          >
            {formInput.completed ? 'Deactivate' : 'Activate'}
          </Button>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

TodoForm.propTypes = {
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
