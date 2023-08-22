package main

import (
	"github.com/crokibolt/note-taking-app/API/controllers"
	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/crokibolt/note-taking-app/API/middlewares"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	router := gin.Default()

	api := router.Group("/api")

	api.POST("/user", controllers.Register)
	api.GET("/user", controllers.Login)

	protected := router.Group("/api/note")
	protected.Use(middlewares.JwtAuthMiddleware())

	protected.GET("/", controllers.Notes)
	protected.POST("/", controllers.NotesCreate)
	protected.DELETE("/:id", controllers.NotesDelete)

	router.Run()
}
