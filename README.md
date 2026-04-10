# project
AI Quiz Generator
# 1. Business Problem

Students often face difficulty in finding quick and customized quizzes for practice.
Most platforms:

Do not provide personalization
Require manual searching
Do not adapt to topic or difficulty

This results in time-consuming learning.

# 2. Possible Solution

An AI-powered system that:

Accepts user input (topic, difficulty, number of questions)
Generates quizzes instantly
Provides interactive answering and scoring
# 3. Implemented Solution

We developed an AI Quiz Generator with:

Chat-based UI (Lovable)
Backend automation (n8n)
AI-generated quiz content
JavaScript-based filtering for accuracy
# Workflow:
User enters query
Request sent to Webhook
AI generates quiz
JavaScript filters valid questions
Quiz returned to UI
User answers and gets score
# 4. Tech Stack Used
n8n – Workflow automation
OpenAI (GPT-4o-mini) – AI generation
Lovable.dev – Frontend UI
JavaScript – Data processing
Webhook API – Communication
# 5. Architecture Diagram
User (Frontend)
      ↓
Webhook (n8n)
      ↓
AI Model (Quiz Generation)
      ↓
Edit Fields
      ↓
JavaScript (Filtering + Validation)
      ↓
Respond to Webhook
      ↓
Frontend Display
# 6. How to Run in Local
Step 1:

Run n8n (cloud or local)

Step 2:

Click “Listen for test event”

Step 3:

#Execute request using PowerShell:

[Invoke-RestMethod -Uri "https://your-n8n-url/webhook-test/quiz" -Method POST -Headers @{ "Content-Type" = "application/json" } -Body '{"topic":"science","difficulty":"easy","num_questions":3}'](https://naina13.app.n8n.cloud/webhook/quiz)
Step 4:

Open frontend and test input:
 Easy science quiz with 3 questions

# 7. References & Resources
n8n Documentation
OpenAI API Docs
Lovable.dev Docs
MDN JavaScript Docs
YouTube tutorials
# 8. Recording

(Add your demo video link here)

# 9. Screenshots

Include:

n8n workflow
Execution logs
Quiz UI
Output screen
🧾 10. Formatting & Alignment
Structured headings
Clean layout
Easy readability
Proper spacing and formatting
# 11. Problems Faced & Solutions
 Problem 1: Random Questions

AI generated unrelated questions

Solution:

Added strict prompt rules
Implemented JS filtering
 Problem 2: Wrong Number of Questions

AI returned extra questions

 Solution:

Enforced count in prompt
Used slicing in JS
 Problem 3: JSON Parsing Errors

Invalid response format

 Solution:

Used .trim()
Forced JSON-only output
