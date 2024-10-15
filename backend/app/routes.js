const userRoute = require("../user/user.routes.js");
const authRoute = require("../auth/auth.routes.js");

const initRoutes = (app) => {
    app.use("/user", userRoute);

    app.use("/auth", authRoute);
}

module.exports = {
    initRoutes
}