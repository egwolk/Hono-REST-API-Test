import { Client } from 'mysql';

const connection = await new Client().connect({
    hostname: "localhost",
    username: "root",
    db: "crud_sample",
    password: "",
})

export default connection;