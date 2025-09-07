# Stage 1: Build
FROM node:22.19.0-alpine AS builder
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
RUN npm install  # all deps for build

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Stage 2: Production image
FROM node:22.19.0-alpine
WORKDIR /usr/src/app

# Only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy compiled JS from builder
COPY --from=builder /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "dist/index.js"]
