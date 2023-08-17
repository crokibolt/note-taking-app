package controllers

import (
	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/crokibolt/note-taking-app/API/models"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func Notes(ctx *gin.Context) {
	var notes []models.Note
	result := initializers.DB.Find(&notes)

	if result.Error != nil {
		ctx.Status(400)
		return
	}

	ctx.JSON(200, gin.H{
		"notes": notes,
	})
}

func NotesCreate(ctx *gin.Context) {

	var body struct {
		Title      string
		Categories []string
		Body       string
	}

	ctx.Bind(&body)

	note := models.Note{Title: body.Title, Categories: pq.StringArray(body.Categories), Body: body.Body}

	result := initializers.DB.Create(&note)

	if result.Error != nil {
		ctx.Status(400)
		return
	}

	ctx.JSON(200, gin.H{
		"note": note,
	})
}

func NotesDelete(ctx *gin.Context) {
	id := ctx.Param("id")

	initializers.DB.Delete(&models.Note{}, id)

	ctx.Status(200)
}
