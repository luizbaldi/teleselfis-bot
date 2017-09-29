const http = require('http');

module.exports = () => {
    
    this.factoryServer = () => {
        const server = http.createServer((request, response) => {
            console.log('Creating server...');
        });
        return server;
    };

    return this;
};