# Base Image
FROM node:14.6

# Define environment variables
ENV APP_NAME schedule-manager
ENV APP /home/${APP_NAME}

RUN mkdir -p $APP && chown -R node:node /home 

WORKDIR $APP
