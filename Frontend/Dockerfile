# Step 1: Build the app
FROM node:18 AS builder
WORKDIR /app
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN npm install && npm run build

# Step 2: Use NGINX to serve the build
FROM nginx:stable-alpine AS runner
# Remove the default NGINX website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to NGINX's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional if you want to customize routing)
 COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
