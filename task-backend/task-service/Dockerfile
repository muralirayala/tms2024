#base image
FROM node:14
WORKDIR D:\taskapp\task-backend\task-service

#copy the app files
COPY package.json* ./

COPY . .

#install dependencies
RUN npm install

#Expose PORT
EXPOSE 3002

#Start the app
CMD [ "node", "server.js" ]
