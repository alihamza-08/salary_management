# # Frontend Dockerfile
# FROM node:20-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve", "-s", "dist", "-l", "3000"]
# Step 1: Build
# Step 1: Build the React/Vite app
FROM node:18 as builder
WORKDIR /app

# Set memory limit for Node.js to prevent build crash
ENV NODE_OPTIONS=--max_old_space_size=512

COPY . .
RUN npm install && npm run build

# Step 2: Serve the built files using serve
FROM node:18 as runner
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]

