# Base image
FROM node:19

# Set working directory
WORKDIR /app

# Create new group and user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# Copy all source code to container
COPY . .

# Install dependencies
RUN npm ci --only=production

# Build the production version of the app
RUN npm run build

# Set permissions for working directory
# RUN chown -R nextjs:nodejs /app
# RUN chmod -R 755 /app

# Set user and group to "nextjs"
# USER nextjs

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]