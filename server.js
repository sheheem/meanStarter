const http = require('http');
const dotenv = require('dotenv');
dotenv.config(); 

const app = require('./backend/app.js')

const port = process.env.PORT || 3000;


app.set('port', port);
const server = http.createServer(app);

server.listen(port);