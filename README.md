This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## windows docker 设置网络

```
docker network create network1
```

## 启动数据库

```
mkdir blog-data
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 --name=db1 --network=network1 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

或者旧版Windows Docker客户端运行以下代码
docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 --name=db1 --network=network1 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

## 清空之前的开发环境

```
docker ps
docker kill 容器id
docker rm 容器id
rm -rf blog-data
或
docker container prune
docker volume rm blog-data
```

## 创建数据库

```
docker exec -it 容器id bash
psql -U blog
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## 数据表

首先修改 ormconfig.json 中的 host 为 db1, 然后运行

```
yarn mr
node dist/seed.js
```

## 开发

```
yarn dev
或者
npm run dev
```

```
docker build . -t sean/node-web-app
docker run -p 3000:3000 --network=network1 -d sean/node-web-app
docker run -p 3000:3000 --network=host -d sean/node-web-app
```

```
curl -L http://localhost:3000
```

## 线上部署

```
ssh blog@dev1 'bash -s' < bin/deploy.sh
```
