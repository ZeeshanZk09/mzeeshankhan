# Docker / Compose instructions

## Build production image

Build the Docker image locally (uses multi-stage Dockerfile):

```bash
docker build -t zeeshan-portfolio:latest .
```

Run the production container (make sure to set environment variables e.g. `MONGO_URL`):

```bash
docker run -p 3000:3000 -e NODE_ENV=production -e MONGO_URL='mongodb://root:example@mongo:27017/dbname?authSource=admin' zeeshan-portfolio:latest
```

## Development with docker-compose

Create a `.env` file in repo root with any required env vars (example):

```
MONGO_URL=mongodb://root:example@mongo:27017/portfolio?authSource=admin
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Start services:

```bash
docker compose up --build
```

The app will be available at `http://localhost:3000`.

Notes:

- `docker-compose.yml` mounts the source into the container to support live reload for dev.
- For production deployments use the `Dockerfile` build and push the image to your registry.
