# Use an official node.js runtime as a parent image
FROM node:18-alpine

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3
# Set the working directory in the container
WORKDIR /app

# Copy the package.json and the package-lock.json files to the container
COPY package*.json .

# Install the dependencies
RUN npm install


# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 2121

# Define the command to run your application
CMD ["node", "./src/server.js"]