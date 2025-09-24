# Muainishi wa Madawa 💊

<p align="center">
  <strong>An AI-powered application for instant, accurate classification and analysis of pharmaceuticals.</strong>
</p>

<p align="center">
  <img src="https://i.imgur.com/8a6Q4sR.png" alt="Muainishi wa Madawa Application Screenshot" width="800"/>
</p>

---

## Overview

**Muainishi wa Madawa** (Swahili for "Drug Classifier") is a sleek, powerful web application designed to demystify pharmaceuticals. By leveraging the advanced capabilities of the Google Gemini API, this tool provides users with comprehensive information about drugs from either a text query or an image of the pill itself.

The application is built for healthcare students, curious individuals, or professionals who need quick access to reliable drug information, grounded with real-world sources from trusted sites like `drugs.com` and `drugsdata.org`.

## ✨ Key Features

- **Dual Input Modes:** Analyze a drug by typing its name or by simply uploading an image of it.
- **AI-Powered Analysis:** Utilizes the `gemini-2.5-flash` model for fast and intelligent data retrieval and processing.
- **Reliable, Sourced Information:** Integrates Google Search grounding to ensure the data is up-to-date and provides links to the original sources.
- **Comprehensive Results:** Get beautifully structured information on:
  - **Classification:** The drug's pharmacological class.
  - **Common Uses:** What it's prescribed for.
  - **Potential Side Effects:** A list of common adverse effects.
- **Persistent History:** Your analysis history is automatically saved to your browser. Re-visit any past analysis with a single click.
- **Modern & Responsive UI/UX:**
  - **Drag-and-Drop:** Effortlessly drop an image file to start the analysis.
  - **Skeleton Loaders:** A smooth, content-aware loading experience that reduces perceived wait time.
  - **Toast Notifications:** Clean, non-intrusive feedback for actions like clearing history.
  - **Aesthetically Pleasing Design:** A clean, minimal, and fully responsive interface built with Tailwind CSS.

## 🚀 Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **AI Engine:** Google Gemini API (`@google/genai`)
- **Icons:** Custom SVG components

##  kullanım How to Use

The application is designed to be intuitive and straightforward.

1.  **Select Your Mode:** Choose to analyze a drug **By Name** or **By Image**.
2.  **Provide Input:**
    - If by name, type the drug's name (e.g., "Aspirin") into the input field.
    - If by image, click the upload area to select a file, or simply drag and drop an image onto it.
3.  **Analyze:** Hit the "Analyze Drug" button.
4.  **View Results:** The AI-generated results will appear in neatly organized cards.
5.  **Check History:** Your query is automatically saved in the **History** panel on the right. You can click any past entry to view its results again.

## 🧑‍💻 Contributing

Contributions are welcome! If you'd like to help improve Muainishi wa Madawa, please follow these steps.

### Prerequisites

- An active **Google Gemini API Key**.
- A local development environment with Node.js and a package manager (like npm or yarn).

### Local Setup

1.  **Fork and Clone the Repository:**
    ```bash
    git clone https://github.com/[YOUR_USERNAME]/muainishi-wa-madawa.git
    cd muainishi-wa-madawa
    ```

2.  **Set Up Environment Variables:**
    The application requires your Google Gemini API key to be available as an environment variable. You can set this up in your development environment or use a `.env` file if you integrate a build tool like Vite or Create React App.
    ```
    # In your shell or .env file
    API_KEY="YOUR_GEMINI_API_KEY"
    ```
    *The application code directly uses `process.env.API_KEY` to initialize the Gemini client.*

3.  **Install Dependencies & Run:**
    (Assuming a standard local development server setup)
    ```bash
    npm install
    npm run start
    ```

### Making Contributions

1.  **Create a New Branch:**
    ```bash
    git checkout -b feature/your-awesome-feature
    ```
2.  **Make Your Changes:** Implement your feature or fix the bug. Ensure the code is clean and follows the project's style.
3.  **Commit Your Changes:**
    ```bash
    git commit -m "feat: Add your awesome feature"
    ```
4.  **Push to Your Fork:**
    ```bash
    git push origin feature/your-awesome-feature
    ```
5.  **Open a Pull Request:** Go to the original repository on GitHub and open a pull request from your forked branch. Provide a clear description of the changes you've made.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
