const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = [
    './routes/auth.js',
    './routes/posts.js',
    './routes/users.js'
  
    
];

const doc = {
    info: {
        version: "1.0.0",
        title: "social_media API",
        description: "The <b>social_media</b> API Documentation."
    },
    schemes: ['http'],
    host: `localhost:3001`,
    basePath: "/api",
}


swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./index.js');
})
