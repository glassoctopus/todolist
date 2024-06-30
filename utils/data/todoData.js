import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createTask = (task) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleTask = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/todos/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getTasks = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/todos`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTask = (id, task) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTask = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createTask,
  getSingleTask,
  getTasks,
  updateTask,
  deleteTask,
};
