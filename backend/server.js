import app from './config/app.config';
import vars from './config/var.config';
import db from './config/db.config';

// Connect mongodb
db();

// Run server
app.listen(vars.port, () => console.info(`Capos server started on port ${vars.port}(${vars.env})`));
