const userRoute = require("../user/user.routes.js");

const initRoutes = (app) => {
    app.use("/user", userRoute);
}

module.exports = {
    initRoutes
}