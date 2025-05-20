FROM ubuntu:22.04

RUN apt-get update && apt-get install -y curl gnupg2 openssl ca-certificates

RUN curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["npm", "test"]
