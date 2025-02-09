# Gateway microservices

## Steps for dev environment

1. Clone the repository
2. Install dependencies
3. Create file `.env` based on `.env.template`
4. Start up nast server
    ```
    docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
    ```
5. Execute `npm run start:dev` or `yarn start:dev`

## Prod

1. Clone the repository
2. Create env based in env.template
3. Execute command
```
docker compose -f docker-compose.prod.yml build
```