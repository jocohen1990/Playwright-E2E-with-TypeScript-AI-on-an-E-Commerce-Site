# Official Playwright image: Node, browsers and OS dependencies preinstalled.
# Keep the tag in sync with @playwright/test in package.json.
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV CI=true

# Pass credentials at runtime: docker run --env-file .env valentino-tests
CMD ["npm", "test"]
