const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://likelion-ssu-todolist.store', 
			changeOrigin: true,
		})
	);
};