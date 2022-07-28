console.log("antra paskaita-kuriame serveri");

//iportuojam http moduli
const http = require('http');

//nurodome hostą - kaip IP adresas serverio
const hostname = '127.0.0.1';
//nurodome porta
const port = 3000;

//nurodome request listener ir response, kas ateina ir kas iseina
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world');
});

//paleidziame savo serveri ir ji istransliuojame
server.listen(port, hostname, () =>{
    console.log(`Serveris paleistas http://${hostname}:${port}/`);
});


