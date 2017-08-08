FROM node:alpine
MAINTAINER Anthony Rawlins <anthony.rawlins@unimelb.edu.au>

# Make working dir
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

#RUN npm install -g npm

RUN npm install

COPY . .

EXPOSE 4200
CMD ["npm", "start"]
