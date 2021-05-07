module.exports = {
  devServer: {
    port: 9999,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigon: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};