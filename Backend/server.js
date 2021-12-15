const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/Routes/index');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
routes.forEach(([name, handler]) => app.use(`/${name}`, handler));

const PORT = 8000;
const connection_String = `mongodb+srv://charukaTharindhu:jQmBthyktbkrCv7Q@merncrude.qhyvi.mongodb.net/mernCrudDB?retryWrites=true&w=majority`;

mongoose.connect(connection_String, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connected!');
});

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
