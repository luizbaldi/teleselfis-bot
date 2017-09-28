/* External modules */
const axios = require('axios');

/* MyJson URL */
const baseUrl = 'https://api.myjson.com/bins/80g2p';

module.exports = () => {

    this.getUsers = () => {
        return axios.get(baseUrl)
            .then(({data}) => data)
            .catch(err => err);
    };

    this.updateUsers = (users) => {
        axios.put(baseUrl, users);
    };

    this.getCurrentUser = (userId) => {
        return axios.get(baseUrl)
            .then(({data}) => data.find(user => user.id === userId))
            .catch(err => err);
    };

    return this;
}

