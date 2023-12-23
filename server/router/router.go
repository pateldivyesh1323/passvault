package router

import (
	"github.com/gorilla/mux"
	"github.com/pateldivyesh1323/passvault/server/controller"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	router.HandleFunc("/", controller.HomePage).Methods("GET")
	return router
}
