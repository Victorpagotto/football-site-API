FROM node:16.14-alpine
WORKDIR /app-backend
EXPOSE 3001
COPY . .
RUN ["npm", "install", "--silent"]
RUN ["npm", "run", "build", "--silent"]
CMD ["npm", "start"]