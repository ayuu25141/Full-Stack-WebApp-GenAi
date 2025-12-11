// package main

// import (
// 	"fmt"
//   "github.com/joho/godotenv"
// 	"github.com/gofiber/fiber/v2"
// 	"os"
// )

// func main() {
// 	godotenv.Load()
// 	 // FIX: load API key AFTER .env
//     API_KEY = os.Getenv("GROQ_API_KEY")
// 	app := fiber.New()

// 	app.Get("/", func(c *fiber.Ctx) error {
// 		return c.SendString("Fiber server running...")
// 	})

// 	// TEST API
// 	app.Get("/test-generate", func(c *fiber.Ctx) error {

// 		description := "generate a sample form with name, email, phone"
// 		filename := "fiber_test.html"

// 		// Call your generator.go function
// 		html, err := GenerateHTMLPage(description)
// 		if err != nil {
// 			return c.Status(500).SendString("Generation Error: " + err.Error())
// 		}

// 		filePath, err := saveHTML(html, filename)
// 		if err != nil {
// 			return c.Status(500).SendString("File Save Error: " + err.Error())
// 		}

// 		return c.JSON(fiber.Map{
// 			"success": true,
// 			"file":    filePath,
// 		})
// 	})
// 	fmt.Println("Genearation complete")

// 	fmt.Println("🚀 Fiber server running at http://localhost:8080")
// 	app.Listen(":8080")
// }



// package main

// import (
// 	"bytes"
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"net/http"
// 	"os"

// 	"github.com/gofiber/fiber/v2"
// 	"github.com/joho/godotenv"
// )

// var API_KEY string

// func main() {
// 	godotenv.Load()
// 	API_KEY = os.Getenv("GROQ_API_KEY")

// 	if API_KEY == "" {
// 		fmt.Println("❌ ERROR: GROQ_API_KEY missing in .env")
// 		return
// 	}

// 	app := fiber.New()

// 	// Allow frontend
// 	app.Use(func(c *fiber.Ctx) error {
// 		c.Set("Access-Control-Allow-Origin", "*")
// 		c.Set("Access-Control-Allow-Headers", "*")
// 		c.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
// 		if c.Method() == "OPTIONS" {
// 			return c.SendStatus(200)
// 		}
// 		return c.Next()
// 	})

// 	// MAIN ROUTE: receive description and generate HTML
// 	app.Post("/generate", func(c *fiber.Ctx) error {
//     var body struct {
//         Description string `json:"description"`
//     }

//     if err := c.BodyParser(&body); err != nil {
//         return c.Status(400).JSON(fiber.Map{
//             "error": "Invalid request",
//         })
//     }

//     html, err := GenerateHTMLPage(body.Description)
//     if err != nil {
//         return c.Status(500).SendString("Generation Error: " + err.Error())
//     }

//     return c.JSON(fiber.Map{
//         "success": true,
//         "html":    html,   // ⭐ RETURN HTML DIRECTLY
//     })
// })

// 	fmt.Println("🚀 Server running at http://localhost:8080")
// 	app.Listen(":8080")
// }

// // ---------------------------------------------------
// // SIMPLE GROQ API CALL
// // ---------------------------------------------------
// func GenerateHTML(desc string) (string, error) {

// 	payload := map[string]interface{}{
// 		"model": "llama3-8b-8192",
// 		"messages": []map[string]string{
// 			{"role": "user", "content": "Generate clean HTML form: " + desc},
// 		},
// 	}

// 	jsonData, _ := json.Marshal(payload)

// 	req, _ := http.NewRequest("POST",
// 		"https://api.groq.com/openai/v1/chat/completions",
// 		bytes.NewBuffer(jsonData),
// 	)

// 	req.Header.Set("Content-Type", "application/json")
// 	req.Header.Set("Authorization", "Bearer "+API_KEY)

// 	client := &http.Client{}
// 	resp, err := client.Do(req)
// 	if err != nil {
// 		return "", err
// 	}
// 	defer resp.Body.Close()

// 	bodyBytes, _ := ioutil.ReadAll(resp.Body)

// 	var result struct {
// 		Choices []struct {
// 			Message struct {
// 				Content string `json:"content"`
// 			} `json:"message"`
// 		} `json:"choices"`
// 	}

// 	json.Unmarshal(bodyBytes, &result)

// 	if len(result.Choices) == 0 {
// 		return "", fmt.Errorf("No response from Groq")
// 	}

// 	return result.Choices[0].Message.Content, nil
// }



package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

var API_KEY string

func main() {
	godotenv.Load()
	API_KEY = os.Getenv("GROQ_API_KEY")

	if API_KEY == "" {
		fmt.Println("❌ ERROR: GROQ_API_KEY missing in .env")
		return
	}

	app := fiber.New()

	// ------------------ CORS ------------------
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Headers", "*")
		c.Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		if c.Method() == "OPTIONS" {
			return c.SendStatus(200)
		}
		return c.Next()
	})

	// ------------------ POST /generate ------------------
	app.Post("/generate", func(c *fiber.Ctx) error {
		var body struct {
			Description string `json:"description"`
		}

		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}

		// ------------------ Simple input validation ------------------
		desc := strings.TrimSpace(body.Description)
		if desc == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Description cannot be empty"})
		}
		if len(desc) > 300 {
			return c.Status(400).JSON(fiber.Map{"error": "Description too long"})
		}

		// Only allow form-related keywords (optional)
		allowed := []string{"form", "input", "contact", "registration"}
		valid := false
		for _, keyword := range allowed {
			if strings.Contains(strings.ToLower(desc), keyword) {
				valid = true
				break
			}
		}
		if !valid {
			return c.Status(400).JSON(fiber.Map{"error": "Only form-related requests are allowed"})
		}

		html, err := GenerateHTMLPage(desc)
		if err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}

		return c.JSON(fiber.Map{
			"success": true,
			"html":    html,
		})
	})

	fmt.Println("🚀 Server running at http://localhost:8080")
	app.Listen(":8080")
}

// ------------------ Call Groq API ------------------
func GenerateHTMLPage(description string) (string, error) {
	prompt := fmt.Sprintf(`
Create a complete, modern, responsive HTML5 page based on this description: %s

Requirements:
- Use proper <html>, <head>, and <body> tags
- Include a <form> with all fields described
- Add CSS inside <style> in the head
- Include JS only if necessary
- Return ONLY HTML (no markdown or extra text)
- Make it clean, simple, and mobile responsive
`, description)


	payload := map[string]interface{}{
		"model": "llama-3.3-70b-versatile",
		"messages": []map[string]string{
			{"role": "user", "content": prompt},
		},
		"temperature": 0.7,
		"max_tokens":  1024,
	}

	jsonData, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST",
		"https://api.groq.com/openai/v1/chat/completions",
		bytes.NewBuffer(jsonData),
	)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+API_KEY)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	resBody, _ := io.ReadAll(resp.Body)

	var result struct {
		Choices []struct {
			Message struct {
				Content string `json:"content"`
			} `json:"message"`
		} `json:"choices"`
	}

	json.Unmarshal(resBody, &result)

	if len(result.Choices) == 0 {
		return "", fmt.Errorf("No response from Groq")
	}

	// Clean HTML: remove any backticks if present
	html := strings.TrimSpace(result.Choices[0].Message.Content)
	html = strings.TrimPrefix(html, "```html")
	html = strings.TrimPrefix(html, "```")
	html = strings.TrimSuffix(html, "```")

	return strings.TrimSpace(html), nil
}
