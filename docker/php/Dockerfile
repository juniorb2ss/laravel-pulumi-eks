FROM php:7.4-fpm AS PHP

MAINTAINER Carlos Eduardo <juniorb2ss@gmail.com>

ENV PHP_OPCACHE_VALIDATE_TIMESTAMPS="0" \
    PHP_OPCACHE_MAX_ACCELERATED_FILES="10000" \
    PHP_OPCACHE_MEMORY_CONSUMPTION="192" \
    PHP_OPCACHE_MAX_WASTED_PERCENTAGE="10"

ENV BUILD_DEPS \
    build-essential \
    zlib1g-dev \
    libicu-dev \
    libpcre3-dev \
    libpq-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libmemcached-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev

ENV RUNTIME_DEPS \
    libicu63 \
    libpq5 \
    unzip \
    libfcgi0ldbl \
    libpng16-16 \
    libjpeg62-turbo \
    libmemcached11 \
    libmemcachedutil2 \
    libxml2 \
    libzip4

ENV PHP_EXTENSIONS \
    gd \
    opcache \
    zip \
    intl \
    mbstring \
    pdo_mysql \
    bcmath

ENV PECL_EXTENSIONS timezonedb

# defining default workdir
WORKDIR /application

RUN apt-get update && apt-get install -y --no-install-recommends ${BUILD_DEPS} ${RUNTIME_DEPS} \
    && docker-php-ext-install ${PHP_EXTENSIONS} \
    && pecl install ${PECL_EXTENSIONS} redis-4.3.0 \
    && docker-php-ext-enable ${PECL_EXTENSIONS} redis \
    && apt-get autoremove -y ${BUILD_DEPS} \
    && rm -rf /var/lib/apt/lists/*

# copy php config files
COPY ./docker/php/configs/php/*.ini /usr/local/etc/php/conf.d/

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

FROM PHP AS DEPENDENCIES

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

# Copy applications file
COPY --chown=www:www ./application ./

RUN composer install \
            --optimize-autoloader \
            --no-dev \
            --no-interaction \
            --prefer-dist

FROM PHP AS APPLICATION

# copy config fpm config files
COPY ./docker/php/configs/fpm/*.conf /usr/local/etc/php-fpm.d/

# Copying vendor dependencies
COPY --from=DEPENDENCIES --chown=www:www /application ./

# entrypoint
COPY ./docker/php/entrypoint /usr/local/bin

# Change current user to www
USER www

ENTRYPOINT ["entrypoint"]

CMD ["php-fpm"]
