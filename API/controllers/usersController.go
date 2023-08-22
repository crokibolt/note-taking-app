package controllers

import (
	"errors"
	"fmt"
	"html"
	"strings"

	"github.com/crokibolt/note-taking-app/API/helpers"
	"github.com/crokibolt/note-taking-app/API/initializers"
	"github.com/crokibolt/note-taking-app/API/models"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func userExists(username string) (models.User, bool) {
	var user models.User
	err := initializers.DB.Model(models.User{}).Where("username = ?", username).Take(&user).Error

	if err != nil {
		return user, false
	} else {
		return user, true
	}
}

func hashPassword(pass string) (string, error) {
	var passwordBytes = []byte(pass)

	hashedPasswordBytes, err := bcrypt.
		GenerateFromPassword(passwordBytes, bcrypt.MinCost)

	return string(hashedPasswordBytes), err
}

func GetUserById(id uint) (models.User, error) {
	var user models.User

	if err := initializers.DB.First(&user, id).Error; err != nil {
		return user, errors.New("user not found")
	}

	user.PrepareGive()

	return user, nil
}

func CurrentUser(ctx *gin.Context) {
	user_id, err := helpers.ExtractTokenID(ctx)

	if err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	user, err := GetUserById(user_id)

	if err != nil {
		ctx.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "success",
		"data":    user,
	})
}

func Register(ctx *gin.Context) {
	var registerBody struct {
		Username string
		Password string
	}

	ctx.Bind(&registerBody)
	username := html.EscapeString(strings.TrimSpace(registerBody.Username))
	_, exists := userExists(username)

	if exists {
		ctx.JSON(400, gin.H{
			"message": "username taken",
		})
		return
	}

	hashed, err := hashPassword(registerBody.Password)

	if err != nil {
		ctx.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	user := models.User{Username: username, Password: hashed, Notes: []models.Note{}}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		ctx.JSON(400, gin.H{
			"message": result.Error.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "User registered successfully!",
	})

}

func Login(ctx *gin.Context) {
	var loginBody struct {
		Username string
		Password string
	}

	ctx.Bind(&loginBody)
	username := html.EscapeString(strings.TrimSpace(loginBody.Username))

	user, exists := userExists(username)

	if !exists {
		ctx.JSON(400, gin.H{
			"message": "User not found",
		})
		return
	}

	fmt.Println(user)
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginBody.Password))

	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		ctx.JSON(400, gin.H{
			"message": "Invalid Password",
		})
		return
	}

	token, err := helpers.GenerateToken(user.ID)

	if err != nil {
		ctx.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(200, gin.H{"token": token})
}
