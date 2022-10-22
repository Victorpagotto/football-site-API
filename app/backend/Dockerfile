FROM node:16.14-alpine
WORKDIR /app-backend
COPY . .
RUN ["npm", "install", "--silent"]
EXPOSE 3001
RUN ["npm", "run", "build", "--silent"]
CMD ["npm", "start"]