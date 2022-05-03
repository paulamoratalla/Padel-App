module.exports = app => {

    const index = require("./index.routes");
    app.use("/", index);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes);

    const userRoutes = require("./user.routes");
    app.use("/perfil", userRoutes);

    const matchRoutes = require("./match.routes");
    app.use("/partidos", matchRoutes);

    const clubRoutes = require("./club.routes");
    app.use("/clubs", clubRoutes);

    const apiRouter = require('./api.routes');
    app.use('/api', apiRouter);

    const commentRoutes = require('./comment.routes');
    app.use('/comentario', commentRoutes);
}