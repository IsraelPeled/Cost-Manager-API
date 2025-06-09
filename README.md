# 💰 Cost Manager API

A simple RESTful API for managing personal expenses. Built with **Node.js**, **Express**, and **MongoDB**. The system allows users to add costs, generate monthly reports, and view user data with total expenses.

---

## 📁 Project Structure

├── app.js # Main server file\
├── controllers/ # Express route controllers\
│ ├── aboutController.js\
│ ├── costController.js\
│ └── userController.js\
├── models/ # Mongoose models\
│ ├── User.js\
│ └── Cost.js\
├── routes/ # API routes\
│ ├── about.js\
│ ├── costs.js\
│ └── users.js\
├── tests/ # API and unit tests\
│ ├── test_api.py\
│ └── unit_test.py\
├── package.json\

---

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/cost-manager-api.git
   cd cost-manager-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:\
   Create a `.env` file and add your MongoDB URI:
   ```js
   MONGO_URI = "your_mongodb_connection_string";
   ```
4. Run the server:
   ```
   npm run dev
   ```

---

# 🧠 Features

## ➕ Add a Cost

```bash
POST /api/add/
```

Adds a new expense record.

**Request Body:**

```js
{
  "description": "milk",
  "category": "food",
  "userid": 123123,
  "sum": 8,
  "date": "2025-05-10"  // optional
}
```

**Response (200):**

```js
{
  "_id": "665c2d97f7a83e0012d3a891",
  "description": "milk",
  "category": "food",
  "userid": 123123,
  "sum": 8,
  "date": "2025-05-10T00:00:00.000Z",
  "__v": 0
}
```

## 📊 Get Monthly Report

```bash
GET /api/report/?id=123123&year=2025&month=5
```

Returns a structured breakdown of a user's expenses for a specific month.

**Response (200):**

```js
{
  "userid": 123123,
  "year": 2025,
  "month": 5,
  "costs": [
    {
      "food": [
        {
          "sum": 8,
          "description": "milk",
          "day": 10
        }
      ]
    },
    {
      "health": []
    },
    {
      "housing": []
    },
    {
      "sport": []
    },
    {
      "education": []
    }
  ]
}

```

## 👤 Get User Info

```bash
GET /api/users/:id
```

Returns user details and total expenses.

**Response (200):**

```js
{
  "first_name": "mosh",
  "last_name": "israeli",
  "id": 123123,
  "total": 80
}
```

## ℹ️ About

```bash
GET /api/about/
```

Returns the names of the team members.

**Response (200):**

```js
[
  {
    first_name: "Israel",
    last_name: "Peled",
  },
  {
    first_name: "Shira",
    last_name: "Shani",
  },
];
```

# ✅ Testing

## Python API test:

```bash
python tests/test_api.py
```

## Unit tests:

```bash
python tests/unit_test.py
```

# 🛠️ Technologies

- Node.js

- Express.js

- MongoDB + Mongoose

- JSDoc

- Python (for API tests)

# 👥 Authors

- Israel Peled

- Shira Shani

# 🌐 Deployed URL

```bash
https://api-node-cost-manager.onrender.com
```
