import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function CountryPicturePage() {
    const { name } = useParams();
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const username = decodedToken ? decodedToken.sub : null;
    const navigate = useNavigate();

    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/api/photos/country/${name}`)
            .then((response) => response.json())
            .then((data) => { console.log(data); setPhotos(data); });
    }, [name]);
    const countryName = name;


    return (
        <>

            <div className="py-5 position-relative" style={{
                background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
                color: "#00f0ff"
            }}>
                <div className="container text-center">
                    <h1 className="display-5 fw-bold" style={{ fontFamily: "'Orbitron', sans-serif'" }}>
                        📸 Photo Album
                    </h1>
                    <p className="lead mb-4" style={{ fontFamily: "'Roboto Mono', monospace'" }}>
                        Capture moments. Relive memories.
                    </p>
                    <Link
                        to={`/photos/upload/${countryName}`}
                        className="btn btn-lg shadow-lg"
                        style={{
                            background: "#00f0ff",
                            color: "#0d0d0d",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff"
                        }}
                    >
                        Add New Photo
                    </Link>
                </div>
                <div style={{ position: "absolute", top: "20px", right: "20px" }}>
                    <button
                        className="btn btn-outline-light"
                        onClick={() => navigate("/")}
                        style={{ boxShadow: "0 0 5px #00f0ff" }}
                    >
                        Back
                    </button>
                </div>
            </div>

            <div className="container my-5">
                <div className="row g-4">
                    {photos.map(photo => (
                        <div className="col-lg-4 col-md-6" key={photo.id}>
                            <div
                                className="card h-100 shadow-lg"
                                style={{
                                    borderRadius: "15px",
                                    backgroundColor: "#1a1a2e",
                                    color: "#00f0ff",
                                    fontFamily: "'Roboto Mono', monospace",
                                    border: "2px solid #00f0ff",
                                    transition: "transform 0.3s, box-shadow 0.3s"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = "scale(1.03)";
                                    e.currentTarget.style.boxShadow = "0 0 20px #00f0ff, 0 0 40px #00f0ff";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.boxShadow = "0 0 10px #00f0ff, 0 0 20px #00f0ff";
                                }}
                            >
                                <img
                                    src={photo.url}
                                    className="card-img-top"
                                    alt={photo.description}
                                    style={{ height: "220px", objectFit: "cover", borderBottom: "2px solid #00f0ff" }}
                                />

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title" style={{ fontWeight: "bold" }}>{photo.title}</h5>
                                    <p
                                        className="card-text"
                                        style={{ color: "#e6faff" }}  
                                    >
                                        {photo.description}
                                    </p>

                                    <p className="card-text mt-auto">
                                        <small style={{ color: "#9ffcff" }}>
                                            Added by: {photo.username}
                                        </small>
                                    </p>

                                    <div className="mt-3 d-flex flex-column gap-2">
                                        <Link
                                            to={`/photos/${photo.id}`}
                                            className="btn shadow-lg w-100"
                                            style={{
                                                background: "#00f0ff",
                                                color: "#0d0d0d",
                                                fontWeight: "bold",
                                                borderRadius: "10px",
                                                boxShadow: "0 0 10px #00f0ff, 0 0 20px #00f0ff",
                                                transition: "0.3s"
                                            }}
                                        >
                                            View
                                        </Link>
                                        {photo.username === username && (
                                            <Link
                                                to={`/photos/edit/${photo.id}`}
                                                className="btn btn-outline-info w-100"
                                                style={{ borderColor: "#00f0ff", color: "#00f0ff" }}
                                            >
                                                Edit
                                            </Link>
                                        )}
                                        {photo.username === username && (
                                            <Link
                                                to={`/photos/delete/${photo.id}`}
                                                className="btn btn-outline-danger w-100"
                                                style={{ borderColor: "#ff0066", color: "#ff0066" }}
                                            >
                                                Delete
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}