package controllers

import (
	"github.com/crokibolt/note-taking-app/API/helpers"
	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/crokibolt/note-taking-app/API/models"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func Notes(ctx *gin.Context) {
	var notes []models.Note
	uid, err := helpers.ExtractTokenID(ctx)

	if err != nil {
		ctx.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	result := initializers.DB.Where("user_id = ?", uid).Find(&notes)

	if result.Error != nil {
		ctx.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"notes": notes,
	})
}

func NotesCreate(ctx *gin.Context) {
	uid, err := helpers.ExtractTokenID(ctx)

	if err != nil {
		ctx.Status(400)
		return
	}

	var body struct {
		Title      string
		Categories []string
		Body       string
	}

	ctx.Bind(&body)

	note := models.Note{Title: body.Title, Categories: pq.StringArray(body.Categories), Body: body.Body, UserID: uid}

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
	uid, err := helpers.ExtractTokenID(ctx)

	if err != nil {
		ctx.Status(400)
		return
	}

	id := ctx.Param("id")

	initializers.DB.Where("user_id = ?", uid).Delete(&models.Note{}, id)

	ctx.Status(200)
}
