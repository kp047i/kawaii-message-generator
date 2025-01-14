FROM golang:1.22.8

WORKDIR /app
COPY . .

COPY go.mod go.sum ./
RUN go mod download && go mod verify

CMD ["go", "run", "main.go"]