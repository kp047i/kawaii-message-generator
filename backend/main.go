package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

type Message struct {
	ID    int    `json:"id"`
	Image string `json:"image"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	fmt.Fprintf(w, "Hello World")
}

func main() {

	// e := echo.New()

	// // Middleware
	// e.Use(middleware.Logger())
	// e.Use(middleware.Recover())

	// // Routes
	// // e.GET("/", handler)

	// // Start server
	// // e.Logger.Fatal(e.Start(":1323"))

	// e.GET("/", handler)
	// e.GET("/", func(c echo.Context) error {
	// 	return c.String(http.StatusOK, "Hello, World!")
	// })

	// e.Post("/message", message)
	// e.GET("/messages", messages)

	// e.Logger.Fatal(e.Start(":8080"))

	http.HandleFunc("/", handler)

	http.HandleFunc("/message", message)
	http.HandleFunc("/messages", messages)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

type RequestBody struct {
	Image string `json:"image"`
}

func message(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	// リクエストボディの読み取り
	var requestBody RequestBody
	err := json.NewDecoder(r.Body).Decode(&requestBody)
	if err != nil {
		http.Error(w, "リクエストの解析に失敗しました", http.StatusBadRequest)
		return
	}

	if requestBody.Image == "" {
		http.Error(w, "imageがありません", http.StatusBadRequest)
		return
	}

	// 保存
	db, err := sql.Open("mysql", "tester:password@tcp(db:3306)/test")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// insertRow := Message{Image: requestBody.Image}
	// db..Create(&insertRow)
	_, err = db.Exec("INSERT INTO messages (image) VALUES (" + requestBody.Image + ")")
	if err != nil {
		log.Fatal(err)
	}

	// レスポンスをJSON形式で返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // 200 OK
	// err = json.NewEncoder(w).Encode(responseBody)
	// if err != nil {
	// 	http.Error(w, "レスポンスの作成に失敗しました", http.StatusInternalServerError)
	// 	return
	// }
}

// ------------------------------------------------------------------------------------------

func messages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	messages := getMessages()
	json.NewEncoder(w).Encode(messages)
}

func getMessages() []*Message {
	db, err := sql.Open("mysql", "tester:password@tcp(db:3306)/test")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Println("DB接続エラー")
	}
	log.Println("DB接続成功!!!")

	// _, err = db.Exec("INSERT INTO messages (image) VALUES ('test1')")
	// if err != nil {
	// 	log.Fatal(err)
	// }

	results, err := db.Query("SELECT * FROM messages")
	if err != nil {
		panic(err)
	}

	var messages []*Message
	for results.Next() {
		var m Message
		err := results.Scan(&m.ID, &m.Image)
		if err != nil {
			panic(err)
		}
		messages = append(messages, &m)
	}
	return messages
}
