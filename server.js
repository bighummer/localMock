const jsonServer = require('json-server')
const db = require('./mock/db')
const routes = require('./router')
const port = 8080

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const rewriter = jsonServer.rewriter(routes)

server.use(middlewares)
// 将 POST 请求转为 GET
server.use((request, res, next) => {
  console.log(request.method)
  // request.method = 'GET'
  next()
})

server.use(rewriter) // 注意：rewriter 的设置一定要在 router 设置之前
server.use(router)

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    status: 0,
    msg: '',
    errno: 0
  })
}

server.listen(port, () => {
  console.log('open mock server at localhost:' + port)
})