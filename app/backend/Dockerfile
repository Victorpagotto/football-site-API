FROM node:16.14-alpine
WORKDIR /app-backend
EXPOSE 3001
COPY . .
RUN ["npm", "install", "--silent"]
RUN echo 'Dependecies installed.'
RUN ["npm","run","predev"]
RUN echo 'Predev installation successful. Initializing.'
CMD ["npm","run","dev"]