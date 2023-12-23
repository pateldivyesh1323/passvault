package controller

import (
	"context"
	"fmt"
	"net/http"

	"github.com/pateldivyesh1323/passvault/server/helper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func init() {
	clientOptions := options.Client().ApplyURI(helper.GetEnv("MONGO_URI"))
	c, err := mongo.Connect(context.TODO(), clientOptions)
	helper.HandleErr(err)
	client = c
	fmt.Println("MongoDB connected")
}

func HomePage(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("<h2>Welcome to Passvault backend.</h2>"))
}
