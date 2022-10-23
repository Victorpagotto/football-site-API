FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
EXPOSE 3001
RUN ["npm", "install", "--silent", "npm", "run", "build", "--silent"]
CMD ["npm", "start"]