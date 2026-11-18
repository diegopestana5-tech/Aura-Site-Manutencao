FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG NEXT_PUBLIC_GTM_ID
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/out/ /usr/share/nginx/html/

EXPOSE 80