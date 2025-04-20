FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# CODEX: Generate Prisma client inside container for correct binary
RUN npx prisma generate
CMD ["npm", "start"]
