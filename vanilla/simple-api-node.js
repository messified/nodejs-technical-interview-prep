const http = require('node:http');
const products = require('../products.json');

const hostname = '127.0.0.1';
const port = 3000;

const getProductsWithAsyncAwait = async () => {
  return JSON.stringify(products);
}

const getProductsWithPromise = async () => {
  return new Promise((resolve, reject) => {
    if(products) {
      resolve(JSON.stringify(products));
    }

    reject(new Error('Products Not Found'));
  });
}

const server = http.createServer(async (req, res) => {
  if(req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write("Hi there, This is a Vanilla Node.js API Root");
        res.end();
  }
  if(req.url === '/products' && req.method === 'GET') {
    try{
      // const myProducts = await getProductsWithAsyncAwait();

      /**
       * Within an async function all promises can be resolved with await
       */
      const myProducts = await getProductsWithPromise();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(myProducts);
    } catch(e) {
      throw new Error(e);
    }

    res.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});