FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Copy root package files
COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy all source code
COPY src ./src

# Build the project
RUN npm run build

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=3002

WORKDIR /usr/src/app

# Copy root package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built files from development stage
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3002

CMD ["node", "dist/comments/main"]
