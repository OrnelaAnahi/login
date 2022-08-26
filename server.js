import * as dotenv from 'dotenv'
dotenv.config()
import cluster from 'cluster'
import os from 'os'
import minimist from 'minimist'

const options = { default: { port: 3000, modo: 'FORK' } }
const args = minimist(process.argv.slice(2), options)
console.log(args)
const PORT = process.env.PORT || args.port
const MODO = args.modo

import app from './app.js'
import http from 'http'
const server = http.createServer(app)

if (MODO=='CLUSTER' && cluster.isPrimary) {
  const cpus = os.cpus().length;
  console.log(`Primary PID ${process.pid}, port ${PORT}, modo ${args.MODO}`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {  
  server.listen(PORT, () => {
    console.log(
      `Servidor http escuchando en el puerto ${PORT}, process ID: ${process.pid}`
    );
  });
}

