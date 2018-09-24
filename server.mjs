import { createServer } from 'http';
import { readFile } from 'fs';
import { extname } from 'path';

createServer(function (request, response) {
	const filePath = request.url === '/' ? './dist/index.html' : './dist' + request.url;
	const extension = extname(filePath);
	let contentType = 'text/html';

	switch (extension) {
	case '.js':
		contentType = 'text/javascript';
		break;
	case '.css':
		contentType = 'text/css';
		break;
	case '.json':
		contentType = 'application/json';
		break;
	case '.png':
		contentType = 'image/png';
		break;
	case '.jpg':
		contentType = 'image/jpg';
		break;
	case '.svg':
		contentType = 'image/svg+xml';
		break;
	}

	readFile(filePath, (error, content) => {
		if (error) {
			if(error.code === 'ENOENT'){
				readFile('./dist/404.html', (_error, content404) => {
					response.writeHead(404, { 'Content-Type': contentType });
					response.end(content404, 'utf-8');
				});
				console.log(`404 ${request.method} ${request.url}`);
			} else {
				console.error(error);
				console.error(content);
				response.writeHead(500);
				response.end('Internal server error: ' + error.code + '\n');
				response.end();
				console.log(`500 ${request.method} ${request.url}`);
			}
		} else {
			response.writeHead(200, { 'Content-Type': contentType });
			response.end(content, 'utf-8');
			console.log(`200 ${request.method} ${request.url}`);
		}
	});

}).listen(8080);
console.log('Server running at http://0.0.0.0:8080/');