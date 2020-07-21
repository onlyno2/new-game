FROM ruby:2.6.5-alpine

RUN apk add --update --no-cache \
      binutils-gold \
      build-base \
      curl \
      file \
      g++ \
      gcc \
      git \
      less \
      libstdc++ \
      libffi-dev \
      libc-dev \ 
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      libgcrypt-dev \
      make \
      pkgconfig \
      postgresql-dev \
      tzdata \
      nodejs \
      yarn

RUN gem install bundler

RUN mkdir -p /app
WORKDIR /app

ADD Gemfile ./
ADD Gemfile.lock ./

RUN bundle install

EXPOSE 3000

