#base image
FROM node:14

# Set working directory inside the container
WORKDIR /usr/src/app
#WORKDIR D:\taskapp\task-backend\subtask-service

#copy the app files
COPY package.json* ./

COPY . .

#install dependencies
RUN npm install

#Expose PORT
EXPOSE 3002

#Start the app
CMD [ "node", "server.js" ]
