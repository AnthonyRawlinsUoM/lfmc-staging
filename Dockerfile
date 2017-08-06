FROM node:boron

# Make working dir
WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 4200
CMD ["npm", "start"]
