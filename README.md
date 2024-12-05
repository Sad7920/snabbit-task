# Dynamic Pricing Application

This project provides a dynamic pricing solution for various sports facilities. Pricing can be influenced by specific rules, such as time-based, day-based, or date-specific overrides.

---

## Features

### Backend

- Flask-based REST API for price calculation.
- Supports:
  - Default pricing for various sports and durations.
  - Overrides for specific dates, times, or days.

### Frontend

- React-based intuitive user interface.
- Users can select:
  - Sport type.
  - Duration.
  - Date and time to get a calculated price.

---

## Setup

### Prerequisites

- **Backend:**
  - Python 3.8 or higher
  - Flask
  - Flask-CORS
- **Frontend:**
  - Node.js (v14 or higher)
  - npm or yarn

### Backend Setup

1. **Navigate to the backend directory.**
2. **Install required dependencies:**
   ```bash
   pip install flask flask-cors
   ```
3. **Run the Flask server:**
   ```bash
   python app.py
   ```
   The server will run on `http://127.0.0.1:5000`.

### Frontend Setup

1. **Navigate to the frontend directory.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the React app:**
   ```bash
   npm start
   ```
   The app will run on `http://localhost:3000`.

---

## Testing

### Prerequisites

- **Testing Framework:** Jest
- **HTTP Client:** Axios

### Steps

1. **Install Dependencies:**
   Ensure the following packages are installed:

   ```bash
   npm install jest axios
   ```

2. **Ensure Backend is Running:**
   Start the Flask server on `http://127.0.0.1:5000`.

3. **Run Tests:**
   Add the following script to `package.json` under `"scripts"`:
   ```json
   "scripts": {
     "test": "jest"
   }
   ```
   Then execute:
   ```bash
   npm test
   ```

### Test Cases

The test cases are designed to validate the pricing hierarchy. Below are the scenarios tested:

| Query Date & Time | Duration | Expected Price (Rs) | Explanation                                    |
| ----------------- | -------- | ------------------- | ---------------------------------------------- |
| 01-12-2024, 2 PM  | 60 mins  | 210                 | Day-based override applies (+10).              |
| 04-01-2024, 2 PM  | 60 mins  | 205                 | Time-based override applies (+5).              |
| 05-01-2024, 2 PM  | 60 mins  | 190                 | Date-specific override takes precedence (-10). |
| 05-01-2024, 4 PM  | 60 mins  | 220                 | Date-specific override applies (+20).          |
| 05-01-2024, 10 AM | 60 mins  | 200                 | Default pricing used (no overrides).           |

---

## Assumptions and Constraints

1. Default pricing is predefined for each sport and duration.
2. Date-specific overrides take precedence over all others.
3. Time-based overrides are applied only if date-specific overrides are absent.
4. Backend runs on `http://127.0.0.1:5000`.
5. Frontend runs on `http://localhost:3000`.
