import { useEffect, useState } from "react"
import {jwtDecode} from "jwt-decode";
import { useNavigate, useParams,Link } from "react-router-dom";
export function DetailsPage() {
    const [photo, setPhoto] = useState({ title: "", url: "", description: "" });
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const decode=jwtDecode(token);
    const username=decode.sub;
    useEffect(() => {
        fetch(`http://localhost:8080/api/photos/${id}`).
            then((response) => response.json()).
            then((data) => setPhoto(data));
    }, [id])
    const returnHome = () => {
        navigate("/countries/" + photo.countryName);
    }
    return (
        <>
  <div 
    className="container my-5 d-flex justify-content-center"
    style={{ maxWidth: "1000px" }}
  >
    <div 
      className="card border-0 shadow-lg"
      style={{ 
        background: "linear-gradient(135deg, #050b14, #0b1a2a)",
        color: "#00f6ff",
        borderRadius: "18px",
        boxShadow: "0 0 30px rgba(0,246,255,0.25)"
      }}
    >
      <div style={{ position: "relative", overflow: "hidden", borderTopLeftRadius: "18px", borderTopRightRadius: "18px" }}>
        <img
          src={photo.url}
          className="card-img-top"
          alt={photo.title}
          style={{ 
            maxHeight: "420px", 
            objectFit: "cover",
            filter: "contrast(1.1) saturate(1.1)"
          }}
        />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(120deg, rgba(255,255,255,0.08), rgba(255,255,255,0))",
          pointerEvents: "none"
        }} />
      </div>

      <div className="card-body p-4">
        <h2 
          className="card-title mb-3"
          style={{ 
            letterSpacing: "1px",
            textShadow: "0 0 8px rgba(0,246,255,0.6)"
          }}
        >
          {photo.title}
        </h2>

        <p 
          className="card-text"
          style={{ color: "#9adfe6" }}
        >
          {photo.description}
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">
          <button
            onClick={returnHome}
            className="btn"
            style={{
              color: "#00f6ff",
              border: "1px solid #00f6ff",
              background: "transparent",
              boxShadow: "0 0 10px rgba(0,246,255,0.6)",
            }}
          >
            ← Back
          </button>

          {username === photo.username && (
            <Link
              to={`/photos/edit/${photo.id}`}
              className="btn"
              style={{
                background: "#00f6ff",
                color: "#020409",
                fontWeight: "600",
                boxShadow: "0 0 15px rgba(0,246,255,0.8)"
              }}
            >
              Edit Photo
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
</>
    );
}