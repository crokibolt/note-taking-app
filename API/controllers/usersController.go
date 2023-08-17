package controllers

import (
	"errors"

	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/crokibolt/note-taking-app/API/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func userExists(username string) bool {
	var user models.User
	result := initializers.DB.Model(&models.User{}).Where("username = ?", username).First(&user)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		return false
	} else {
		return true
	}
}

func hashPassword(pass string) (string, error) {
	var passwordBytes = []byte(pass)

	hashedPasswordBytes, err := bcrypt.
		GenerateFromPassword(passwordBytes, bcrypt.MinCost)

	return string(hashedPasswordBytes), err
}

func Register(ctx *gin.Context) {
	var registerBody struct {
		Username string
		Password string
	}

	ctx.Bind(&registerBody)

	if userExists(registerBody.Username) {
		ctx.Status(400)
		return
	}

	hashed, err := hashPassword(registerBody.Password)

	if err != nil {
		ctx.Status(400)
		return
	}

	user := models.User{Username: registerBody.Username, Password: hashed, Notes: []models.Note{}}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		ctx.Status(400)
		return
	}

	ctx.JSON(200, gin.H{
		"message": "User registered successfully!",
	})

}
