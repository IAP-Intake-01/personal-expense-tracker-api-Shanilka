const sql = require('mysql');
const Schema = sql.Schema;

const userSchema = new Schema({
    emai: {
        type: String,
        require: true,
    }
})