import { useState } from 'react';
import axios from 'axios';

const useAxios = (baseUrl) => { // handels the traffic between server and form with several handling options (del, update, post)
  // error handling and timeouts sind auch hier definiert - DER Ort an dem was schief gehen kann.
  // const [data, setData] = useState(null); //data is the response from the server, null by default 
  const [data, setData] = useState([]); //data is the response from the server, [] by default 
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const showAlert = (message, type) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert((currentAlert) => ({ ...currentAlert, show: false }));
    }, 5000);
  };

  const makeRequest = async (method, endpoint, payload = null) => { //makes a server req, takes  method, endpoint, and payload as arguments
    try {
      setLoading(true);
      const response = await axios[method](`${baseUrl}/${endpoint}`, payload);
      setData(response.data);
      showAlert('Book added successfully', 'success');
    } catch (err) {
      showAlert(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };
  const get = async (endpoint) => makeRequest('get', endpoint);
  const post = async (endpoint, payload) =>
    makeRequest('post', endpoint, payload);
  const update = async (endpoint, payload) =>
    makeRequest('put', endpoint, payload);
  const remove = async (endpoint) => makeRequest('delete', endpoint);

  return { data, alert, loading, get, post, update, remove };
};

export default useAxios;