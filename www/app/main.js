import React from "react";
import dva from "dva";
import router from "./router.js";
import picshow from "./models/picshow.js";
import carlist from "./models/carlist.js";
import logger from "redux-logger";
// 创建一个app
const app = dva({
    // onAction :logger
});
// 创建一个路由
app.router(router);
// 创建并使用一个模型
app.model(picshow);
app.model(carlist);
// 上树运行
app.start("#app");