const fs = require("fs"); 
const { Client } = require("@elastic/elasticsearch");

const esClient = new Client({
  node: "https://localhost:9200",
  auth: {
    username: "elastic",
    password: "123456",
  },
  tls: {
    ca: fs.readFileSync("./src/http_ca.crt"),
    rejectUnauthorized: false, 
  },
});

module.exports = { esClient };
