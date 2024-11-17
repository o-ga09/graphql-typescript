# Stage 1: Build
FROM node:14 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY schema.graphql ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

### Production stage
FROM node:14-alpine AS production

# Set working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/schema.graphql ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "dist/app.js"]
