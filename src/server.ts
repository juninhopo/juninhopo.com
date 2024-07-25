import { serverHttp } from "./http";

const port = process.env.PORT || 3333;

serverHttp.listen(port, () => console.log(`🚀 Server is Running in port: http://localhost:${port}/index.html`));