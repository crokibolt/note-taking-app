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

	api := router.Group("/api")

	api.GET("/note", controllers.Notes)
	api.POST("/note", controllers.NotesCreate)
	api.DELETE("/note/:id", controllers.NotesDelete)
	api.POST("/user", controllers.Register)

	router.Run()
}
