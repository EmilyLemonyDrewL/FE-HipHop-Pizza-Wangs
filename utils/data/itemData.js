import { clientCredentials } from '../client';

const getItems = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/items`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getItems;
