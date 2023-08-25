const express = require('express');
require('dotenv').config();

const app = express();
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');


mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URL);

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
const dburl = process.env.dburl;
const PORT = process.env.PORT || 3001;

//middelwer
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// conection db
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(conn => console.log('Connected'))
    .catch(err => console.log(err));

//routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

// Swagger API documentation
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
