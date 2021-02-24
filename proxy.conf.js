const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "http://localhost:8000/",
    secure: false, //usado true para url's que são https
    logLevel: "debug",
    pathRewrite: { "^/api": "" },
  },
];

module.exports = PROXY_CONFIG;
