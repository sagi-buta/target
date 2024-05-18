const testRouter = require('./test.router')
const studentsRouter = require('./students.router')
const actionsRouter = require('./actions.router')
const adminRuoter = require('./admins.router')
const filesRuoter = require('./files.router')
const dataRouter = require('./data.router')

const maineRouter = (app) => {
    // app.use("/", testRouter)
    app.use('/students', studentsRouter)
    app.use('/actions', actionsRouter)
    app.use('/admins', adminRuoter)
    app.use('/files', filesRuoter)
    app.use('/data', dataRouter)
}


module.exports = maineRouter



