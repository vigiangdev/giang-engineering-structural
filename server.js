const app = require("./app");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log("Unhandled Rejection at:", err.stack || err);
  server.close(() => {
    console.log("Server closing");
    process.exit(1);
  });
});
