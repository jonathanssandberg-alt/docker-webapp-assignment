# Använd officiell Node.js image som bas
FROM node:18-alpine

# Sätt arbetskatalog i containern
WORKDIR /usr/src/app

# Kopiera package.json och package-lock.json
COPY app/package*.json ./

# Installera dependencies
RUN npm install --production

# Kopiera applikationskod
COPY app/ .

# Exponera porten som appen lyssnar på
EXPOSE 3000

# Skapa en non-root användare för säkerhet
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /usr/src/app

# Byt till non-root användare
USER nodejs

# Starta applikationen
CMD ["npm", "start"]