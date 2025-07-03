# 📊 React Spreadsheet UI

A dynamic, spreadsheet-style UI built with **React** and **Tailwind CSS**, supporting keyboard navigation, column resizing, and custom cell rendering.

---

## 🚀 Features

- ✅ Spreadsheet-style table layout using CSS grid  
- ✅ Column grouping via **Super Headers**  
- ✅ Keyboard navigation (arrow keys)  
- ✅ Click-to-select and highlight cells  
- ✅ Custom-styled tags:  
  - Status badges  
  - Priority labels  
- ✅ Column stretch/resize functionality  
- ✅ Bottom tab navigation with active highlight  
- ✅ Responsive layout with sticky headers  

---

## 🧑‍💻 Tech Stack

- React
- TypeScript  
- Tailwind CSS  

---

## 📦 Dependencies

### Runtime

```json
{
  "@tailwindcss/vite": "^4.1.11",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-spreadsheet": "^0.10.1",
  "tailwindcss": "^4.1.11"
}
```

### Development

```json
{
  "@eslint/js": "^9.29.0",
  "@types/react": "^19.1.8",
  "@types/react-dom": "^19.1.6",
  "@vitejs/plugin-react": "^4.5.2",
  "eslint": "^9.29.0",
  "eslint-plugin-react-hooks": "^5.2.0",
  "eslint-plugin-react-refresh": "^0.4.20",
  "globals": "^16.2.0",
  "typescript": "~5.8.3",
  "typescript-eslint": "^8.34.1",
  "vite": "^7.0.0"
}
```

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── TopNavBar.tsx
│   ├── Toolbar.tsx
│   ├── BottomNavBar.tsx
│   ├── TableHead.tsx
│   ├── FinancialOverviewHeader.tsx
│   ├── FinancialOverviewHeaderEmptyTable.tsx
│   └── SpreadSheet.tsx
│
├── interfaces/
│   └── index.ts
│
├── utils/   
│   └── styleHelper.ts
│
├── main.tsx
├── index.css
└── App.tsx
```

---

## 👨‍💻 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/react-spreadsheet-ui.git
cd react-spreadsheet-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

> App runs at: [http://localhost:5173]

---

## ⌨️ Keyboard Navigation

| Key            | Action                     |
|----------------|-----------------------------|
| ⬆ / ⬇ / ⬅ / ➡ | Move selection between cells |

---

## 🖱️ Mouse Interactions

- Click to select cell  
- Drag stretch handle (bottom-right of selected cell) to copy down value  

---

## 🙌 Credits

Built with ❤️ by [Your Name](https://github.com/your-username)
