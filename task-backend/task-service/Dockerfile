#base image
FROM node:14

#WORKDIR D:\taskapp\task-backend\task-service
# Set working directory inside the container
WORKDIR /usr/src/app

#copy the app files
COPY package.json* ./

COPY . .

#install dependencies
RUN npm install

#Expose PORT
EXPOSE 3003

#Start the app
CMD [ "node", "server.js" ]
