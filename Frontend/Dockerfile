# # Frontend Dockerfile
# FROM node:20-alpine
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve", "-s", "dist", "-l", "3000"]
# Step 1: Build
FROM node:18 as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: Serve using a 
FROM node:18 as runner
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
