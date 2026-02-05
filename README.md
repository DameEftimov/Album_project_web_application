# Album Project Web Application

## Description
Album Project is an interactive web application for photos where users can browse pictures by country on the map of Europe. The application has a **Java Spring Boot backend** and a **React frontend**.  

Features:
- Display photos by country on an interactive map.
- Users can add new photos to the country they clicked on the map.
- Users can view all photos in the application.
- Users can **edit and delete only their own photos**. Other users' photos are view-only.

---

## Technologies
- **Backend:** Java, Spring Boot, H2 in-memory database
- **Frontend:** React, HTML, CSS, JavaScript


## How to Run

1. **Clone the project:**

```bash
git clone https://github.com/DameEftimov/Album_project_web_application.git
```

2. **Start the backend:**
   ```bash
   cd Album_project_web_application/backend
   mvn spring-boot:run
   ```
3. **Start the frontend:**
   ```bash
   cd ../frontend
   npm install   # only the first time
   npm start

