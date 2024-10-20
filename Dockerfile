# Dockerfile for task-backend with multiple microservices
FROM node:18

# Set the working directory to the backend folder
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for all microservices
COPY ./package*.json ./

# Install global dependencies for all microservices
RUN npm install

# Copy the entire task-backend directory
COPY . .

# Set default environment variables for the service name and port
ARG SERVICE_NAME=user-service
ARG PORT=3001

# Build the app based on the service name
RUN if [ "${SERVICE_NAME}" = "task-frontend" ]; then \
      echo "Building frontend..."; \
      cd task-frontend && npm run build --silent || echo "Ignoring build warnings"; \
    else \
      echo "Building backend service: ${SERVICE_NAME} on port: ${PORT}"; \
      # This is a placeholder for additional backend build commands if needed
      echo "Exposing port ${PORT} and preparing to run the server"; \
    fi

# Expose the specified port
EXPOSE ${PORT}

# Log the node command and then run the server
CMD sh -c 'if [ "${SERVICE_NAME}" != "task-frontend" ]; then \
              echo "Running: node task-backend/${SERVICE_NAME}/server.js"; \
              node task-backend/${SERVICE_NAME}/server.js; \
            fi'
