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

# Copy build output ke nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# (opsional) Copy .env ke nginx folder sebagai fallback jika ada
COPY --from=builder /app/.env /usr/share/nginx/html/.env

# Custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY --from=builder /app/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
