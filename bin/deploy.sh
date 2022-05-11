docker start d60 &&
cd /home/blog/app/ &&
git pull &&
yarn install --production=false &&
docker build . -t sean/node-web-app &&
docker kill app &&
docker rm app &&
docker run --name app -p 3000:3000 --network=host -d sean/node-web-app &&
echo 'OK!'