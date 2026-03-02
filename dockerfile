# Use lightweight nginx image
FROM nginx:alpine

# Copy website files to nginx directory
COPY . /usr/share/nginx/html

# Expose port
EXPOSE 80