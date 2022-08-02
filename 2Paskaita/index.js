console.log("antra paskaita-kuriame serveri");

//iportuojam http moduli
const http = require('http');

//nurodome hostą - kaip IP adresas serverio
const hostname = '127.0.0.1';
//nurodome porta
const port = 3000;

//nurodome request listener ir response, kas ateina ir kas iseina
const server = http.createServer((req, res) => {
    res.statusCode = 200; //200 statusas nurodo, kad viskas gerai
    res.setHeader('Content-Type', 'text/plain'); //informacija apie musu requesta
    res.end('Hello world');
});

//paleidziame savo serveri ir ji istransliuojame . (serveris klausosi, sakom duok duomenis ir jis atsako Hello world)
server.listen(port, hostname, () =>{
    console.log(`Serveris paleistas http://${hostname}:${port}/`);
});


