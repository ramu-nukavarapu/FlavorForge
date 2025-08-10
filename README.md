# 🚀 FlavorForge Frontend

A modern, responsive dashboard for a food product development platform. This application allows users to analyze market trends, create new product concepts, and monitor the performance of existing products. It is built to seamlessly integrate with a FastAPI backend API.

---

### ✨ Features

* **Interactive Dashboard**: Displays key business metrics, recent activity, and market trends with dynamic charts.
* **Multi-Step Product Creator**: Guides users through selecting a category, defining a target audience, and choosing flavor profiles to generate AI-powered product suggestions.
* **Product Analysis**: A searchable and filterable table of all products with detailed performance scores and status.
* **Market Intelligence**: Provides in-depth analysis of trending ingredients and competitive landscape.
* **Context API for State Management**: Uses React Context to handle global states like navigation, loading, and errors, ensuring a consistent user experience.
* **Responsive Design**: The layout adapts gracefully to different screen sizes, from mobile devices to desktops.

---

### 🛠️ Tech Stack

* **Framework**: [React](https://reactjs.org/)
* **Build Tool**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **State Management**: React Context API, `useState`, `useEffect`
* **Charting Library**: [Recharts](https://recharts.org/)
* **Icons**: [Lucide React](https://lucide.dev/showcase/react)
* **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

### 📦 Getting Started

Follow these steps to get the project up and running on your local machine.

#### 1. Prerequisites

Make sure you have Node.js and npm installed.

#### 2. Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/ramu-nukavarapu/FlavorForge.git](https://github.com/ramu-nukavarapu/FlavorForge.git)
    cd FlavorForge
    ```
2.  Install all project dependencies:
    ```bash
    npm install
    ```

#### 3. Running the App

Start the development server. The application will run on `http://localhost:5173`.
```bash
npm run dev
```

Note: This application is designed to work with the FlavorForge Backend API. Please ensure the backend is running and that CORS is configured correctly for the frontend to function properly.