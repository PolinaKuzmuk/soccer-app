const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://api.sportradar.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // removes /api from the request URL
      },
    })
  );
};
