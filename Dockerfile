# official Node.js
FROM node:20-alpine 

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application files
COPY . .

# Expose port Next.js runs on
EXPOSE 3000

# Build the application
RUN npm run build

# Command to run the app
CMD ["npm", "run", "start"]
