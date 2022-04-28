import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "blog",
    password: "",
    database: "blog_development",
    synchronize: true,
    logging: false,
    // entities: [User],
    entities: [
        "dist/entity/**/*.ts"
    ],
    migrations: [],
    subscribers: [],
})
