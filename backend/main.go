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
	http.HandleFunc("/", handler)

	http.HandleFunc("/message", message)
	http.HandleFunc("/messages", messages)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

type ResponseBody struct {
	Message string `json:"message"`
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

	log.Println("★★★POST TEST★★★")
	log.Println(requestBody.Image)
	log.Println("★★★★★★★★★★★★★★★")

	_, err = db.Exec(fmt.Sprintf("INSERT INTO messages (image) VALUES (%s)", requestBody.Image))
	if err != nil {
		log.Fatal(err)
	}

	responseBody := ResponseBody{Message: "success"}

	// レスポンスをJSON形式で返す
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK) // 200 OK
	err = json.NewEncoder(w).Encode(responseBody)
	if err != nil {
		http.Error(w, "レスポンスの作成に失敗しました", http.StatusInternalServerError)
		return
	}
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
