# Fetching the node 12 image
FROM node:12

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copy everything to /app directory
COPY ./ ./

# Starting our application
CMD ["npm", "start"]