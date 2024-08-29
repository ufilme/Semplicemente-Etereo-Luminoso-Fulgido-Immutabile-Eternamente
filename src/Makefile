DEVCOMPOSEFILE=docker-compose.dev.yaml

dev:
	docker compose -f ${DEVCOMPOSEFILE} up -d
	npm run dev

build:
	docker compose up -d

clean:
	docker compose -f ${DEVCOMPOSEFILE} down
	docker compose down
