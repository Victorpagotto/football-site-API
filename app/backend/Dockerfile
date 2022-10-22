FROM node:16.14-alpine
WORKDIR /app-backend
EXPOSE 3001
COPY . .
RUN npm install --silent && echo 'Dependecies installed.'
CMD npm run predev && echo 'Predev installation successful.' && npm run dev && echo 'Initialized.'