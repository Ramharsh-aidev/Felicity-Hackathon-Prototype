## 🚀 Getting Started

Follow these steps to run the Virtual Labs Website locally:

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd virtual-labs-website
    ```

Felicity-Hackathon-Prototype/

```plaintext
├── public
│   ├── placeholder.svg
│
├── src
│   ├── components
│   │   ├── animations
│   │   │   ├── BinarySearchAnimation.tsx
│   │   │   ├── DijkstrasAlgorithmAnimation.tsx
│   │   │   ├── GreedyBestFirstSearchAnimation.tsx
│   │   │   ├── LinkedListAnimation.tsx
│   │   │   ├── MinimumSpanningTreeAnimation.tsx
│   │   │   ├── SelectionSortAnimation.tsx
│   │   │   ├── StackAnimation.tsx
│   │   │
│   │   ├── Chatbot
│   │   │   ├── ChatbotButton.tsx
│   │   │   ├── ChatbotWithAI.tsx
│   │   │   ├── MinimalChatButton.tsx
│   │   │
│   │   ├── home
│   │   │   ├── AlgorithmsSection.tsx
│   │   │   ├── AnnouncementsSection.tsx
│   │   │   ├── EngineeringFieldsSection.tsx
│   │   │   ├── FooterSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │
│   │   ├── ui
│   │       ├── accordion.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── alert.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── drawer.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── sonner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toggle.tsx
│   │       ├── tooltip.tsx
│   │       ├── use-toast.ts
│   │
│   │   ├── AlgorithmCard.tsx
│   │   ├── Map.tsx
│   │   ├── Navbar.tsx
│   │   ├── ParticipatingInstitutes.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TestQuestions.tsx
│
│   ├── data
│   │   ├── topics.ts
│
│   ├── hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│
│   ├── lib
│   │   ├── utils.ts
│
│   ├── pages
│   │   ├── AboutPage.tsx
│   │   ├── AlgorithmDetail.tsx
│   │   ├── ComputerSciencePage.tsx
│   │   ├── ElectricalEngineeringPage.tsx
│   │   ├── Index.tsx
│   │   ├── MechanicalEngineeringPage.tsx
│   │   ├── NotFound.tsx
│   │   ├── TermsPage.tsx
│   │   ├── TopicDetailPage.tsx
│   │
│   ├── services
│   │   ├── gemini.ts
│
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts
```


2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Set up Gemini API Key:**

    *   You will need a Google Cloud project and the Gemini API enabled.
    *   Obtain an API key from the Google Cloud Console.
    *   **Important:** For local development, you can typically set your Gemini API key as an environment variable or directly within your `src\components\Chatbot\MinimalChatButton.tsx` file (for development purposes only - **never commit API keys directly to your repository in production**).  Refer to the Gemini API documentation for secure API key management in production environments.

    ```typescript src\components\Chatbot\MinimalChatButton.tsx (for local development only)
    const geminiApiKey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
    // ... rest of your gemini.ts code
    ```

4.  **Start the development server:**

    ```bash
    npm run dev  # or yarn dev
    ```

    This will start the Vite development server. Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to view the website.

5.  **Build for production (optional):**

    ```bash
    npm run build  # or yarn build
    ```

    This command builds the application for production in the `dist` folder.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to the Virtual Labs Website, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix (`git checkout -b feature/your-feature-name`).
3.  Make your changes and commit them (`git commit -am 'Add some feature'`).
4.  Push to the branch (`git push origin feature/your-feature-name`).
5.  Create a new Pull Request.

Please ensure your contributions adhere to the project's coding style and guidelines.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<br />

## 📜 License and Usage Intent

This project is licensed under the **MIT License**, a permissive open-source license that allows for broad usage, including commercial applications.

**However, as the sole creator of this project, I want to express my intended use and expectations:**

*   **Educational Purposes Primarily:**  This project is intended and best suited for **educational purposes**. It is designed to be a learning resource for students and educators in the field of Data Structures and Algorithms and related engineering topics.
*   **Non-Commercial Use Encouraged for Derivatives:** While the MIT License permits commercial use, I kindly request that if you create derivative works or modifications of this code, you **consider using them primarily for non-commercial educational purposes as well.**
*   **Attribution is Appreciated:** While not legally required beyond the MIT License terms, **attribution to the original "Virtual Labs Website" project and myself (Ramharsh Dandekar)** is greatly appreciated if you use or adapt this code in your own projects, especially educational projects.  This helps give credit to the original effort and allows others to find and benefit from this resource.
*   **Not Intended for "Claiming as Your Own Work":**  Please do not directly copy and claim this entire project as your own original work without significant modification and contribution.  The spirit of open source and ethical use encourages building upon and contributing back, rather than simply taking credit for existing work.

By using the MIT License, I aim to make this project widely accessible and beneficial.  These usage intentions are a request for ethical and community-minded use, while still offering the flexibility of the MIT License.

<br />

![Virtual Labs Website Demo Image](link-to-your-demo-image-or-gif-here)

<br />

## 🔗 Video Demo

[[**Video Link**](https://drive.google.com/drive/folders/1o21ZfUXS9cJWv75Dfk52qvIWvzU_KPpg?usp=drive_link)] -  *Check out the demo to experience Virtual Labs!*

---
