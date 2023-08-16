package main

import (
	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/crokibolt/note-taking-app/API/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DB.AutoMigrate(&models.Note{})
}
