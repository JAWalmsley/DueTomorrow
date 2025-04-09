# pull the Node.js Docker image
FROM node:20.2.0-alpine

# create the directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY . .

RUN npm run build

# expose the web port
EXPOSE 3001

# the command that starts our app
CMD ["npm", "run", "start"]
