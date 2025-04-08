FROM node:20-alpine

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy only package files first (for cache)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the source code
COPY . .

ENV VITE_MVN_API_URL=https://ratoon-backend.remyxia.synology.me

# Expose Vite's default dev port
EXPOSE 5173

# Start the Vite dev server
CMD ["pnpm", "dev", "--host", "--port", "5173", "--strictPort", "--force"]
