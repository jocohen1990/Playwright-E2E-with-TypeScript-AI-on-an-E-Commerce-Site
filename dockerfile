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

# Set port environment variable (if needed for your tests)
ENV port=3000

# Expose the port (if your tests need to access a web server)
EXPOSE 3000

# default test command
CMD ["npm", "start"]