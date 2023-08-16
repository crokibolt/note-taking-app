package main

import (
	"github.com/crokibolt/note-taking-app/API/controllers"
	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	router := gin.Default()

	router.GET("/api/", controllers.Notes)
	router.POST("api/note", controllers.NotesCreate)

	router.Run()
}
