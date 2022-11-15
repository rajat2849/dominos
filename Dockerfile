FROM node:14.21.1
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json . 
RUN npm install 
COPY . . 
EXPOSE 3000
# RUN npm run build

CMD ["sh", "-c", "npm start"]



