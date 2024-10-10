#base image
FROM node:14
WORKDIR D:\taskapp\task-backend\user-service

#copy the app files
COPY package.json* ./

COPY . .

#install dependencies
RUN npm install

#Expose PORT
EXPOSE 3001

#Start the app
CMD [ "node", "server.js" ]
