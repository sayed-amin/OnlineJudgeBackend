# Use the official Node.js image as a base image
FROM node:16

# Install necessary packages
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common && \
    curl -sSL https://get.docker.com/ | sh && \
    apt-get install -y docker redis-server && \
    rm -rf /var/lib/apt/lists/*

# Set environment variables for your application
ENV NODE_ENV=production
ENV PORT=8080
ENV CONTAINERIZED=true

# Create a directory for the Node.js server code
WORKDIR /app

# Copy the Node.js server code into the container
COPY . .

# Install dependencies
RUN npm install

# Expose the necessary ports
EXPOSE 8080

# Run the startup script
CMD ["/bin/bash", "./start.sh"]
