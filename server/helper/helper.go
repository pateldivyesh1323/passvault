package helper

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func HandleErr(err error) {
	if err != nil {
		log.Fatal(err)
	}
}

func GetEnv(key string) string {
	err := godotenv.Load(".env")
	HandleErr(err)
	return os.Getenv(key)
}
