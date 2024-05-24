# Use the official Node.js 20 image from the Docker Hub
FROM node:20

# Set the working directory inside the container
WORKDIR /voice
# Copy package.json and package-lock.json (if present) to the working directory
COPY . .
# Install the project dependencies
RUN npm install

#Expose port 5173
EXPOSE 5173

# Define the command to run the application
CMD ["npm", "run", "dev"]