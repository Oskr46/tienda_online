import { Pool } from "pg"

const pool = new Pool({
    password:"1",
    port:5432,
    user:"postgres",
    host:"localhost",
    database:"empresa1",
});

export default pool;
