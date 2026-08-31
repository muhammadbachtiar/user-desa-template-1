# === Stage 1: Build the React app ===
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
# === Generate SEO file and build the app ===
RUN npm run build
RUN npm run generate-seo

# === Stage 2: Serve with Nginx ===
FROM nginx:alpine AS runner

# Hapus default config
RUN rm -rf /usr/share/nginx/html/*

# Copy build output & .env (opsional jika ada) ke nginx folder
COPY --from=builder /app/package*.json /app/.env* /usr/share/nginx/html/
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY --from=builder /app/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Give user nginx ownership & write permissions to /usr/share/nginx/html so docker-entrypoint.sh can create env-config.js
RUN chown -R 101:101 /usr/share/nginx/html && chmod -R 777 /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
