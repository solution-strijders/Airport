FROM node:12.2.0-alpine

# Create App dir

WORKDIR /app

#Install app dependencies
COPY package*.json ./
RUN npm install

#Bundle app source
COPY . /app/

EXPOSE 8080
CMD [ "npm", "start"]