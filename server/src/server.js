const http = require('http');
const app = require('./app');

const {mongoose, MONGO_URL} = require('./db-config')

const { loadPlanetsData } = require('./models/planets.module') 

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanetsData()

  server.listen(PORT, () => {
    console.log(`Listen on port ${PORT}...`);
  })
}

startServer();

