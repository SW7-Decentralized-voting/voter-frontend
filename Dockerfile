# Base image
FROM node:20 AS builder

RUN apt-get update && \
		apt-get install -y git

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

RUN npm install -g serve

# Copy the entire application source
COPY . .

# Start the application using the existing dev server command
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Serve the app
CMD ["serve", "-s", "dist", "-l", "3001"]