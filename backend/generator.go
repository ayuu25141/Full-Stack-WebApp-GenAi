
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	 

)

//var API_KEY string

// ------------------ Groq API Request Structs ---------------------

type GroqMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type GroqRequest struct {
	Model       string        `json:"model"`
	Messages    []GroqMessage `json:"messages"`
	Temperature float64       `json:"temperature"`
	MaxTokens   int           `json:"max_tokens"`
}

type GroqChoice struct {
	Message GroqMessage `json:"message"`
}

type GroqResponse struct {
	Choices []GroqChoice `json:"choices"`
}

// ------------------ Call Groq API ---------------------

func callGroq(prompt string) (string, error) {
	url := "https://api.groq.com/openai/v1/chat/completions"

	reqBody := GroqRequest{
		Model: "llama-3.3-70b-versatile",
		Messages: []GroqMessage{
			{Role: "user", Content: prompt},
		},
		Temperature: 0.7,
		MaxTokens:   4096,
	}

	jsonData, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+API_KEY)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	resBody, _ := io.ReadAll(resp.Body)

	var groqRes GroqResponse
	json.Unmarshal(resBody, &groqRes)

	if len(groqRes.Choices) == 0 {
		return "", fmt.Errorf("no response received")
	}

	return groqRes.Choices[0].Message.Content, nil
}

// ------------------ Clean HTML ---------------------

func cleanHTMLResponse(html string) string {
	html = strings.TrimSpace(html)

	if strings.HasPrefix(html, "```html") {
		html = strings.TrimPrefix(html, "```html")
		html = strings.TrimSuffix(html, "```")
	}
	if strings.HasPrefix(html, "```") {
		html = strings.TrimPrefix(html, "```")
		html = strings.TrimSuffix(html, "```")
	}

	return strings.TrimSpace(html)
}

// ------------------ Save HTML ---------------------

func saveHTML(content, filename string) (string, error) {
	outputDir := "output"

	if _, err := os.Stat(outputDir); os.IsNotExist(err) {
		os.Mkdir(outputDir, 0755)
	}

	if !strings.HasSuffix(filename, ".html") {
		filename += ".html"
	}

	filePath := filepath.Join(outputDir, filename)

	err := os.WriteFile(filePath, []byte(content), 0644)
	return filePath, err
}

// ------------------ Generate Page ---------------------

func GenerateHTMLPageform(description string) (string, error) {
	prompt := fmt.Sprintf(`
Create a complete HTML page for: %s

Requirements:
- Use full HTML5 structure
- Add CSS inside <style>
- Make it modern, responsive
- Include JS if needed
- Return ONLY HTML, no markdown code blocks.
`, description)

	fmt.Println("🤖 Generating HTML...")

	html, err := callGroq(prompt)
	if err != nil {
		return "", err
	}


	return cleanHTMLResponse(html), nil
}
