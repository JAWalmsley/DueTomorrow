# pull the Node.js Docker image
FROM node:alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

# expose the web port
EXPOSE 3001

ENV DB_NAME=BTE
ENV DB_USER=bte
ENV DB_PASSWORD=password
ENV JWT_SECRET=fhdisufh893nufndn893

# the command that starts our app
CMD ["node", "server.js"]