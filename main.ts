import loadConfig from "./config";
import app from "./app";

const config = loadConfig();

app.listen(config.port, () => {
  console.log("Server is listening on port %s", config.port);
});
