## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the Application with Docker Compose

[Docker Compose](https://docs.docker.com/compose/) is a tool for defining and running multi-container Docker applications. It allows you to define the services, networks, and volumes in a single YAML file and then run them with a single command.

### Prerequisites

Before running Docker Compose, ensure that you have Docker and Docker Compose installed on your machine. You can download and install Docker Desktop from the [official website](https://www.docker.com/products/docker-desktop).

### Steps

1. Navigate to the root directory of your project, where your `docker-compose.yml` file is located.

2. Open a terminal or command prompt.

3. Run the following command to build and start the Docker containers defined in your `docker-compose.yml` file:

   ```bash
   docker-compose up --build
