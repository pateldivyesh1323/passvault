package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/pateldivyesh1323/passvault/server/helper"
	"github.com/pateldivyesh1323/passvault/server/router"
)

var PORT = helper.GetEnv("PORT")

func main() {
	router := router.Router()
	fmt.Println("Server running on PORT : " + PORT)
	if err := http.ListenAndServe(":"+PORT, router); err != nil {
		log.Fatal(err)
	}
}
