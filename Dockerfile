FROM node:20

WORKDIR /src

RUN apt-get update -y

RUN apt-get install -y \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxkbcommon0 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libpango-1.0-0 \
  libasound2 \
  libatspi2.0-0 \
  libpangocairo-1.0-0 \
  libxshmfence1 \
  libxrender1 \
  libxfixes3 -y

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY . .

RUN pnpm dev:prepare

RUN npx puppeteer browsers install chrome

CMD [ "pnpm", "dev" ]
