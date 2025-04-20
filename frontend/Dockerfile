# CODEX: Multi-stage Dockerfile for Feverducation Frontend (Next.js Production)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app .
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
