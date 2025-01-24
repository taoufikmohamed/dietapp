FROM node:18-alpine

WORKDIR /app

# Install required dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install -g expo-cli
RUN npm install
RUN npm install @expo/metro-runtime @expo/webpack-config webpack webpack-dev-server

# Copy project files
COPY . .

# Install web dependencies and build
RUN npx expo install @expo/metro-runtime
RUN npx expo export

# Set environment variables
ENV NODE_ENV=development
ENV WDS_SOCKET_PORT=0

EXPOSE 3000

CMD ["npx", "serve", "dist", "-p", "3000"]