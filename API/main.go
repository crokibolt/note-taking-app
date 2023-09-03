package main

import (
	"log"
	"os"

	"github.com/crokibolt/note-taking-app/API/controllers"
	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/crokibolt/note-taking-app/API/middlewares"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "https://crokibolt.github.io/note-taking-app"},
		AllowMethods:     []string{"PUT", "POST", "OPTIONS", "GET"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "Accept", "Cache-Control", "X-Requested-With"},
		AllowCredentials: true,
	}))

	api := router.Group("/api")

	api.POST("/user/register", controllers.Register)
	api.POST("/user/login", controllers.Login)

	protected := router.Group("/api/note")
	protected.Use(middlewares.JwtAuthMiddleware())

	protected.GET("/", controllers.Notes)
	protected.POST("/", controllers.NotesCreate)
	protected.DELETE("/:id", controllers.NotesDelete)
	protected.GET("/logCheck", controllers.CurrentUser)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	if err := router.Run(":" + port); err != nil {
		log.Panicf("error: %s", err)
	}
}
