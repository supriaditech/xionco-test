# 🚀 xionco-test

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CAE2?style=for-the-badge&logo=EJS&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

**A robust Store Management System featuring Express.js, TypeScript, and an Integrated AI Assistant for stock and sales analysis.**

## 📖 Overview

This repository provides a foundational Node.js web application built with Express.js and TypeScript. It is specifically designed for **Store Management**, allowing admins to manage products, track stock levels, and record transactions. The standout feature is the **AI Assistant**, powered by OpenAI, which provides real-time insights into omzet and inventory through natural language.

## ✨ Features

- 🎯 **Server-Side Rendering (SSR)**: Dynamic and SEO-friendly web pages generated with EJS.
- 🤖 **AI Assistant**: Smart chatbot integrated with your database for automated sales analysis.
- 📦 **Inventory Management**: Full CRUD for products with manual stock control and low-stock indicators.
- 💸 **Cashier System**: Real-time transaction recording with automated price calculation.
- 🛡️ **TypeScript Core**: Enhanced code quality and maintainability with strict type safety.
- ⚡ **Live Reload**: Seamless development experience using `nodemon` and `ts-node`.

## 🛠️ Tech Stack

**Backend & Database:**

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Fast, minimalist web framework.
- **TypeScript**: Enhanced type safety.
- **SQLite**: Lightweight local database managed via Sequelize ORM.
- **OpenAI API**: Powering the intelligent AI Assistant.

**Frontend:**

- **EJS**: Embedded JavaScript templates for dynamic rendering.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Marked.js**: For rendering professional AI chat responses.

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [Yarn](https://yarnpkg.com/) (v1.x)

### Installation

1. **Clone the repository**

   ```bash
   git clone git@supriaditech:supriaditech/xionco-test.git
   cd xionco-test

   ```

2. **Install dependencies**

   ```bash
   yarn install

   ```

3. **Environment Setup Create a .env file in the root directory:**

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here

   ```

4. **Initialize Database**

   ```bash
   npx sequelize-cli db:migrate
   yarn seed

   ```

5. **Start Development Server**
   ```bash
   yarn dev
   ```
