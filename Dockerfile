# Stage 1: Build Dependencies
FROM node:18-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json ./

RUN apk add --no-cache \
    python3 make g++ && \
    npm ci --only=production --cache-folder .npm_cache && \
    rm -rf /var/cache/apk/*

# Stage 2: Building the App
FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=dependencies /app .

COPY . .

RUN npm run build

# Stage 3: Production
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app .

CMD ["node", "server.js"]