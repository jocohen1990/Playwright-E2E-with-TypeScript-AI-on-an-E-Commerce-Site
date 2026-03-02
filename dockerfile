# use the official Node image with browser support
FROM mcr.microsoft.com/playwright:v1.36.2-focal

# set working dir
WORKDIR /app

# copy package files
COPY package*.json ./

# install deps
RUN npm install

# copy all source
COPY . .

# install Playwright browsers (if not in base image)
RUN npx playwright install

# default test command
CMD ["npx", "playwright", "test"]