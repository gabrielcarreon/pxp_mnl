FROM php:8.4-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    libzip-dev \
    ffmpeg \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    gd \
    pdo \
    pdo_mysql \
    curl \
    fileinfo \
    mbstring \
    exif \
    mysqli \
    zip \
    && rm -rf /var/lib/apt/lists/*

RUN EXPECTED_CHECKSUM="$(php -r 'copy("https://composer.github.io/installer.sig", "php://stdout");')" \
    && php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && ACTUAL_CHECKSUM="$(php -r "echo hash_file('sha384', 'composer-setup.php');")" \
    && if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; then \
    >&2 echo 'ERROR: Invalid installer checksum'; \
    rm composer-setup.php; \
    exit 1; \
    fi \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer --quiet \
    && rm composer-setup.php \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y \
    bash \
    git \
    curl \
    unzip \
    nodejs \
    npm \
    && npm install -g pnpm@latest-10 \
    && rm -rf /var/lib/apt/lists/*


ARG SRC_DIR=.
COPY ${SRC_DIR} /var/www/html
COPY ${SRC_DIR}/php.ini /usr/local/etc/php

WORKDIR /var/www/html

EXPOSE 8000
