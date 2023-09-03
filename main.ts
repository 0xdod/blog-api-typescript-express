import app from "./app";
import loadConfig from "./config";

const config = loadConfig();

app.listen(config.port, () => {
  console.log("Server is listening on port %s", config.port);
});
