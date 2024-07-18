import { clientCredentials } from '../client';

const endpoint = clientCredentials.databaseURL;

const createArchtype = (archtype) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archtypes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(archtype),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleArchtype = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archtypes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error fetching single archtype:', error);
      reject(error);
    });
});

const getArchtypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archtypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateArchtype = (id, archtype) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archtypes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(archtype),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    //   return response.json();
    })
    .then((data) => {
      console.log('Update archtype Response:', data); // Log the response data
      resolve(data);
    })
    .catch((error) => {
      console.error('Error updating archtype:', error);
      reject(error);
    });
});

const deleteArchtype = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/archtypes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createArchtype,
  getSingleArchtype,
  getArchtypes,
  updateArchtype,
  deleteArchtype,
};
