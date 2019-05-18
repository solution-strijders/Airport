FROM node:12.2.0-alpine

# Create App dir
RUN mkdir /airport
WORKDIR /airport

#Install app dependencies
COPY package*.json ./
RUN npm install

#Bundle app source
COPY . /airport/

EXPOSE 8080
CMD [ "npm", "start"]