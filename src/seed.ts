import { createConnection } from "typeorm"
import "reflect-metadata"
import { Post } from "./entity/Post"

createConnection().then(async connection => {
    const posts= await connection.manager.find(Post)
    if (posts.length === 0) {
        await connection.manager.save([new Post({
            title:'Post 1',
            content:'我的第一篇文章'
        })])
        // const post2 = await connection.manager.find(Post)
        console.log('数据填充了');
    }
    console.log(posts);
    connection.close()
}).catch(error => console.log(error))
