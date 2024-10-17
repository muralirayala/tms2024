# Base Image
FROM node:14

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining application files
COPY . .

# Expose the port
EXPOSE 3001  
# (or whichever port the service uses)

# Start the application
CMD [ "node", "server.js" ]
