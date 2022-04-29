import { createConnection } from "typeorm"
import "reflect-metadata"

createConnection().then(async connection => {
    connection.close()
}).catch(error => console.log(error))
