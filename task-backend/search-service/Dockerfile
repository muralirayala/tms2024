#base image
FROM node:14
WORKDIR D:\taskapp\task-backend\search-service

#copy the app files
COPY package.json* ./

COPY . .

#install dependencies
RUN npm install

#Expose PORT
EXPOSE 3004

#Start the app
CMD [ "node", "server.js" ]
