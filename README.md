# 🎬 **FavFlix — Movie Management Application**

**FavFlix** is a full-stack movie management application that allows users to **add, edit, delete, and view movies** with authentication, image uploads, and a modern UI.

---

## 🚀 **Tech Stack**

### 🖥️ **Frontend**

* React + TypeScript + Vite
* Tailwind CSS + ShadCN UI
* Axios for API requests
  

### ⚙️ **Backend**

* Node.js + Express.js
* Prisma ORM
* MySQL Database
* Multer for image uploads
* JWT Authentication
* Rate Limiting for API protection

---

## ✨ **Features**

* ✅ User Authentication (Register / Login)
* ✅ Add, Edit, Delete Movies
* ✅ Upload Movie Images
* ✅ Display Movies in a DataTable
* ✅ Role-based Protected Routes
* ✅ Error Handling and Validation with Zod
* ✅ Rate Limiting for API Safety
* ✅ Responsive UI built with Tailwind + ShadCN

---

## 🧩 **Project Setup**

Follow these steps to set up the **FavFlix** project locally:

---

### 🛠️ **1. Clone the Repository**

```bash
git clone https://github.com/devraj27dec/favflix.git
cd favflix
```

---

Would you like me to **continue with installation, environment setup, and run commands** sections (like `npm install`, `.env setup`, and `npm run dev`)? I can add them cleanly formatted next.

---

## 🧩 Folder Structure

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── lib/
│   └── app.ts
└── package.json

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   └── App.tsx
└── package.json
```

---

## ⚙️ Environment Variables

### **Backend (.env)**

```bash
DATABASE_URL="mysql://username:password@localhost:3306/favflix_db"
JWT_SECRET="your_secret_key"
PORT=5000
```

---

## 💾 Database Setup

1. Update your `.env` file with your MySQL connection URL.
2. Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name "init"
   ```
3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

---

## 📦 Installation & Run

### **Backend**

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### **Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🖼️ Image Upload

* Uses **Multer** to handle image uploads.
* Uploaded files are stored in the `/uploads` directory.
* Example route setup:

  ```js
  import multer from "multer";
  const upload = multer({ dest: "uploads/" });
  router.post("/add", upload.single("image"), movieController.addMovie);
  ```

---

## 👤 **Tested User Credentials**

You can use the following demo credentials to log in and test the application:

```bash
Email: dev12@test.com
Password: 123456
```

---

## 🌐 Deployment Notes

* Backend deployed on **Render** or **Railway**.
* Frontend deployed on **Vercel**.

## 📝 License

This project is open source and available under the **MIT License**.

---


