# Form Builder

A modern, intuitive, and feature-rich Form Builder application built with **React**, **TypeScript**, and **Tailwind CSS**. This tool allows users to create forms dynamically, preview them in real-time, and export the generated configuration or code.

![Form Builder Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)

## 🚀 Features

- **Dynamic Form Creation**: Add various field types like text inputs, emails, passwords, numbers, text areas, dropdowns, checkboxes, radios, and date pickers.
- **Real-time Editor**: Drag-and-drop or click-to-add interface with a live canvas.
- **Powerful Properties Panel**: Customize field labels, placeholders, requirement status, and options for each element.
- **Live Preview**: Instantly see how your form will look to end-users.
- **Code View**: View the underlying JSON schema and configuration for the form you've built.
- **Form Management**: Create multiple forms, save them to local storage, and manage them from a central dashboard.
- **Responsive Design**: Built with Tailwind CSS for a seamless experience across all devices.
- **Micro-feedbacks**: Smooth animations and transitions for a premium user experience.

## 🛠️ Tech Stack

- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **State Management**: React Context API with useReducer

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/rifat-hassan-nibir/form-builder.git
    cd form-builder
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Start the development server**:

    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## 📂 Project Structure

- `src/components/dashboard`: Components for the form listing and management dashboard.
- `src/components/editor`: The core form-building interface, including:
  - `builder`: The drag-and-drop canvas and sidebar.
  - `preview`: The form renderer for testing.
  - `code`: The exportable configuration view.
- `src/context`: State management using Context API.
- `src/reducers`: Logic for form and field manipulations.
- `src/utils`: Helper functions for persistence and formatting.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Rifat Hassan Nibir](https://github.com/rifat-hassan-nibir)
