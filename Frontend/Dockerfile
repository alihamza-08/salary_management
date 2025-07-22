# Step 1: Build the app
FROM node:18 AS builder
WORKDIR /app
COPY . .
ENV NODE_OPTIONS="--max-old-space-size=1024"
RUN npm install && npm run build


FROM nginx:stable-alpine AS runner

RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/dist /usr/share/nginx/html


 COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
