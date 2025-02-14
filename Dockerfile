# official Node.js
FROM node:20-alpine AS builder

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

# Stage 2: Production Stage
FROM node:20-alpine 

WORKDIR /app

# Copy only necessary files from builder stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start"]
