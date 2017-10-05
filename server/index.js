import app from "./app";

let currentApp = app;
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`=================================================`)
  console.log(`server running on port ${PORT}`)
  console.log(`=================================================`)
});

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./app", () => {
      app.removeListener("request", currentApp);
      app.on("request", app);
      currentApp = app;
    });
  }
}
