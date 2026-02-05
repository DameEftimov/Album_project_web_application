import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CountryPicturePage } from './Pages/CountryPicturePage';
import { UploadFormPage } from './Pages/UploadFormPage';
import { EditFormPage } from './Pages/EditFormPage';
import { DetailsPage } from './Pages/DetailsPage';
import { ClassicHomePage } from './Pages/ClassicHomePage';
import { ProtectedRoute } from './Component/ProtectedRoute';
import { LoginPage } from './Pages/LoginPage';
import { RegisterPage } from './Pages/RegisterPage';
import { DeletePhotoPage } from "./Pages/DeletePhotoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={
          <ProtectedRoute>
            <ClassicHomePage />
          </ProtectedRoute>
        } />

        <Route path="/countries/:name" element={
          <ProtectedRoute>
            <CountryPicturePage />
          </ProtectedRoute>
        } />

        <Route path="/photos/upload/:name" element={
          <ProtectedRoute>
            <UploadFormPage />
          </ProtectedRoute>
        } />

        <Route path="/photos/edit/:id" element={
          <ProtectedRoute>
            <EditFormPage />
          </ProtectedRoute>
        } />

        <Route path="/photos/delete/:id" element={
          <ProtectedRoute>
            <DeletePhotoPage />
          </ProtectedRoute>
        } />

        <Route path="/photos/:id" element={
          <ProtectedRoute>
            <DetailsPage />
          </ProtectedRoute>
        } />


      </Routes>
    </Router>
  );
}

export default App;
