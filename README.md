# FYP Coordination System
[acadpath.app](https://acadpath.app/)
A full-stack platform to streamline Final Year Project (FYP) management for students, supervisors, and evaluators.

## 🚀 Overview

The **FYP Coordination System** is built to digitize and simplify the complete FYP lifecycle — from proposal submission to final evaluation.  
It improves transparency, tracking, and communication across all stakeholders in the process.

### Core goals
- Reduce manual coordination effort
- Keep project progress visible through milestones
- Standardize evaluation workflows
- Assist students with AI-powered project idea recommendations

---

## ✨ Key Features

- **Proposal Submission Workflow**  
  Students can submit project proposals in a structured format.

- **Supervisor Assignment**  
  Coordinator/s can assign supervisors to students or groups efficiently.

- **Milestone Tracking**  
  Track progress across predefined phases with clear status visibility.

- **Evaluation Management**  
  Support for panel/evaluator workflows with consistent scoring processes.

- **AI Idea Recommendation Chatbot**  
  Helps students explore project ideas based on interests and domain trends.

---

## 🧱 Tech Stack

- **Frontend:** Next.js, TypeScript
- **Backend:** Express.js, MongoDB, Node.js
- **Language:** TypeScript (primary)

> This repository is primarily TypeScript-based and follows modern Next.js full-stack patterns.

---

## 📂 Project Structure (high-level)

```bash
.
├── app/                # App Router pages and layouts
├── components/         # Reusable UI components
├── lib/                # Utilities, helpers, and shared logic
├── public/             # Static assets
└── ...                 # Config and supporting files
```

> Update this section if your actual folder structure differs.

---

## ⚙️ Getting Started

### 1) Clone the repository
```bash
git clone https://github.com/kanwar-mana/fyp-cordination.git
cd fyp-cordination
```

### 2) Install dependencies
```bash
npm install
```

### 3) Configure environment variables
Create a `.env.local` file in the root directory and add required keys:

```env
# Example
NEXT_PUBLIC_APP_URL=http://localhost:3000
# DATABASE_URL=...
# OPENAI_API_KEY=...
```

> Add your real variables based on project requirements.

### 4) Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run lint checks
```

---

## 🎯 Why this project matters

This system demonstrates practical full-stack engineering for real academic administration problems:
- Workflow design for multi-role systems
- Role-based process management
- End-to-end data handling and tracking
- AI feature integration in a domain-specific product

---

## 🔮 Potential Improvements

- Role-based dashboards with analytics
- Notification and reminder system (email/in-app)
- Rubric customization for departments
- Enhanced reporting and export features

---

## 🤝 Contributing

Contributions and suggestions are welcome.  
If you'd like to collaborate, feel free to open an issue or pull request.

---

## 📬 Contact

**Author:** Kanwar Abdull Rahman & Hassan Munir  
**GitHub:** [kanwar-mana](https://github.com/kanwar-mana)

---

## 📄 License

Add your preferred license here (e.g., MIT).
