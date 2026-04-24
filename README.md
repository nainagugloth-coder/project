 AI-Powered Study Assistant

> Transform your lecture notes into flashcards, summaries, and quizzes — with daily WhatsApp reminders.

---
  Business Problem

- Students spend hours manually converting lengthy lecture notes into flashcards and summaries
- Without structured reminders, students forget to revise regularly, leading to poor retention
- Existing study tools do not adapt content difficulty to individual student needs
- Most study materials exist as PDFs with no automatic text extraction or AI processing
- There is no single tool that combines note processing, quiz generation, and revision reminders

---

  Possible Solution

- Build an AI-powered web app that automatically processes lecture notes and PDFs
- Use a Large Language Model to generate flashcards, summaries, and quizzes on demand
- Allow students to select difficulty levels so content adapts to their learning stage
- Automate daily WhatsApp reminders to keep students consistent with revision
- Support PDF uploads so students can directly use their existing study materials

---

 Implemented Solution

- Students can paste notes or upload a PDF directly on the dashboard
- PDF.js extracts all text from the uploaded PDF automatically across all pages
- The backend sends the extracted text to the Groq AI API for processing
- AI generates 5 flashcards in Front/Back format based on the notes
- AI creates a concise summary tailored to the selected difficulty level
- AI produces a 5-question multiple choice quiz with answers
- Difficulty buttons (Easy / Medium / Hard) adjust the complexity of all AI output
- Smart text chunking ensures large PDFs do not exceed API token limits
- n8n workflow sends an automated WhatsApp reminder every day at 9:00 AM via Twilio

---

  Tech Stack

**Frontend**
- HTML5, CSS3, JavaScript for the user interface
- PDF.js for extracting text from uploaded PDF files

**Backend**
- Node.js as the runtime environment
- Express.js for building the REST API server
- Axios for making HTTP requests to the Groq API
- dotenv for managing environment variables and protecting API keys

**AI / LLM**
- Groq API with the LLaMA 3.3 70B model for generating AI content
- Custom text chunking logic to handle large documents within token limits

**Automation**
- n8n for building and running the daily reminder workflow
- Twilio WhatsApp API for sending WhatsApp messages to students

---

 Architecture Diagram

<img width="947" height="722" alt="image" src="https://github.com/user-attachments/assets/ae8d5485-2781-4973-801e-8150c78512c5" />



---

 How to Run Locally

 Prerequisites

- Node.js v18 or above installed
- A free Groq API key from https://console.groq.com
- n8n installed globally for WhatsApp reminders
- A Twilio account with WhatsApp sandbox set up

---

  Step 1 — Set up the project folder

```bash
cd D:\
mkdir study-assistant
cd study-assistant
```

Place `server.js` and `index.html` inside this folder.

---

 Step 2 — Install dependencies

```bash
npm install express axios cors dotenv
```

---

 Step 3 — Create the `.env` file

Create a file named `.env` in the root of your project and add:

```
GROQ_API_KEY=your_groq_api_key_here
```

>  Never share or commit your `.env` file. Add `.env` to your `.gitignore`.

---

 Step 4 — Start the backend server

```bash
npx kill-port 3000
node server.js
```

You should see:

```
injected env (1) from .env
Server running on port 3000
```

---

 Step 5 — Open the frontend

Open `index.html` directly in your browser:

```
D:\study-assistant\index.html
```

---

 Step 6 — Set up n8n for WhatsApp reminders (optional)

```bash
npm install -g n8n
n8n start
```

- Open `http://localhost:5678` in your browser
- Create a new workflow
- Add a **Schedule Trigger** node and set it to run daily at 9:00 AM
- Add a **Twilio** node and fill in your Account SID and Auth Token
- Set the From field to `whatsapp:+14155238886`
- Set the To field to `whatsapp:+your_number`
- Toggle **To WhatsApp** on
- Type your reminder message
- Click **Publish** to activate

---

 Project folder structure

```
study-assistant/
├── server.js        ← Node.js backend server
├── index.html       ← Frontend UI
├── .env             ← API keys (never commit this)
├── package.json
└── node_modules/
```

---

  Problems Faced & Solutions

**1. Deprecated AI model**
- Problem: `mixtral-8x7b-32768` was decommissioned by Groq
- Solution: Switched to `llama-3.3-70b-versatile` which is actively supported

**2. Rate limit exceeded with large PDFs**
- Problem: Uploading a 16-page PDF sent too many tokens and hit the API limit
- Solution: Implemented text chunking — only the first 9,000 characters are sent per request

**3. API key exposed in source code**
- Problem: The Groq API key was hardcoded directly in `server.js`
- Solution: Moved the key to a `.env` file and loaded it using the `dotenv` package

**4. Port conflict error (EADDRINUSE)**
- Problem: Running `node server.js` failed because port 3000 was already in use
- Solution: Run `npx kill-port 3000` before starting the server each time

**5. Difficulty slider frozen in browser**
- Problem: The HTML range input slider was unresponsive and stuck in the middle
- Solution: Replaced the broken slider with three clickable buttons (Easy / Medium / Hard)

**6. Wrong `.env` filename**
- Problem: The file was created as `study.env` instead of `.env` so dotenv could not find it
- Solution: Renamed the file correctly to `.env` with no prefix

**7. n8n password forgotten**
- Problem: Could not log in to n8n after closing and reopening it
- Solution: Ran `n8n user-management:reset` in the terminal to reset and create a new account

**8. Invalid Groq API key error**
- Problem: The API returned `invalid_api_key` even after setting up the `.env` file
- Solution: Generated a fresh API key from the Groq console and updated the `.env` file

**9. Server crashing with `Cannot find module 'dotenv'`**
- Problem: `dotenv` was installed in the wrong folder instead of the project folder
- Solution: Navigated to the correct project folder first, then ran `npm install dotenv`

**10. Twilio WhatsApp number not valid**
- Problem: n8n returned an error saying the phone number was not valid
- Solution: Joined the Twilio WhatsApp sandbox by sending the join code from the phone to `+14155238886` first

---

 Screenshots

 Dashboard — Notes input and PDF upload
<img width="1298" height="655" alt="image" src="https://github.com/user-attachments/assets/5e97b7c4-b443-40c7-bdc0-7d3e9475cd02" />

 Output mode and difficulty selection
<img width="1208" height="869" alt="image" src="https://github.com/user-attachments/assets/b8f33c85-58ab-4136-b674-02bfb158a96f" />

 Generated flashcards output
<img width="1012" height="899" alt="image" src="https://github.com/user-attachments/assets/afd86f92-3a29-48e7-9bb4-560049bc5aaa" />


 n8n automation workflow
<img width="967" height="508" alt="image" src="https://github.com/user-attachments/assets/0fe04cd4-b225-4c67-be03-8b18c158aaf6" />
 

---

Screen Recording

https://drive.google.com/file/d/1aly2T20dWHADP2kLuSmZtSc2p35Q0Dik/view?usp=sharing

---
 References & Resources

- Groq API Documentation — https://console.groq.com/docs
- LLaMA Model Info — https://groq.com/models
- PDF.js Library — https://mozilla.github.io/pdf.js
- Node.js Documentation — https://nodejs.org/en/docs
- Express.js Documentation — https://expressjs.com
- n8n Documentation — https://docs.n8n.io
- Twilio WhatsApp Sandbox — https://console.twilio.com
- dotenv Package — https://www.npmjs.com/package/dotenv
- Axios Package — https://axios-http.com/docs/intro


