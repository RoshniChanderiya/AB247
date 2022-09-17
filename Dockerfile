# pull official base image
FROM 920871934450.dkr.ecr.us-east-1.amazonaws.com/node18:v202208171643 as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY . ./
COPY . /app
RUN ls

# add to env vars in aws
ARG REACT_APP_API_URL
ARG REACT_APP_SOCKET_URL
ARG REACT_APP_COGNITO_USER_POOL_ID
ARG REACT_APP_COGNITO_CLIENT_ID
ARG GH_TOKEN

ENV REACT_APP_API_URL=${REACT_APP_API_URL}
ENV REACT_APP_SOCKET_URL=${REACT_APP_SOCKET_URL}
ENV REACT_APP_COGNITO_USER_POOL_ID=${REACT_APP_COGNITO_USER_POOL_ID}
ENV REACT_APP_COGNITO_CLIENT_ID=${REACT_APP_COGNITO_CLIENT_ID}
ENV GH_TOKEN=${GH_TOKEN}

RUN sh setupNPM.sh ${GH_TOKEN}
RUN npm install
# add app
COPY . ./

RUN REACT_APP_NODE_ENV=${NODE_ENV}\
    REACT_APP_BUILD=${BUILD}\
    npm run build

# production environment
FROM 920871934450.dkr.ecr.us-east-1.amazonaws.com/nginx-alpine:v202208171643
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
COPY nginx.conf /etc/nginx/conf.d/default.conf
