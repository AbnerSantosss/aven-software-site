import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
const root=path.resolve('out');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
if(!existsSync(path.join(root,'index.html')))throw new Error('Execute npm run build antes de npm start.');
http.createServer((request,response)=>{
  let requested;
  try {requested=decodeURIComponent(new URL(request.url,'http://localhost').pathname);}catch{response.writeHead(400).end();return;}
  let file=path.resolve(root,'.'+requested);
  if(file!==root&&!file.startsWith(root+path.sep)){response.writeHead(403).end();return;}
  if(existsSync(file)&&statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!existsSync(file)){response.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});createReadStream(path.join(root,'404.html')).pipe(response);return;}
  response.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});
  createReadStream(file).pipe(response);
}).listen(4175,'127.0.0.1',()=>console.log('AVEN Software: http://127.0.0.1:4175'));
