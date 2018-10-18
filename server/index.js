// const fs = require('fs')
const http = require('http')
const server = http.createServer()

// ホスティングする場合
// server.on('request', (request, response) => {
// 	var stream = fs.createReadStream('index.html')
// 	response.writeHead(200, {'Content-Type':'text/html'})
// 	stream.pipe(response)
// })

server.listen(8080)

const io = require('socket.io').listen(server)

io.on('connection', (socket) => {
	socket.on('message', (message) => {
		io.emit('message', message)
	})
})
