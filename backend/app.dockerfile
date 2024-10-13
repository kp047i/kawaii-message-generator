FROM golang:1.23.2

WORKDIR /app
COPY . .

COPY go.mod go.sum ./
RUN go mod download && go mod verify

CMD ["go", "run", "main.go"]