const { db } = require('./db/connection.js');
const app = require('./src/app.js');
const port = 3000;

app.listen(port, async ()=> {
    await db.sync();
    console.log('Listening on port: ' + port);
});