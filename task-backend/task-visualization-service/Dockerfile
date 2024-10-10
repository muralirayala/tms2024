#base image
FROM node:14
WORKDIR D:\taskapp\task-backend\task-visualization-service

#copy the app files
COPY package.json* ./

COPY . .

#install dependencies
RUN npm install

#Expose PORT
EXPOSE 3005

#Start the app
CMD [ "node", "server.js" ]
