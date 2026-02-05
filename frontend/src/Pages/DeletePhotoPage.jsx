import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export function DeletePhotoPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [country, setCountry] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8080/api/photos/${id}`).
            then((response) => response.json()).
            then((data) => {
                setCountry(data.countryName);
            });
    }, [id]);
    const handleDelete = () => {
        fetch(`http://localhost:8080/api/photos/delete/${id}`, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
                alert("Photo deleted successfully");
                navigate(`/countries/${country}`);

            } else {
                alert("Failed to delete photo");
            }
        });
    }
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
            <div
                className="card border-0 rounded-4 p-5"
                style={{
                    maxWidth: "520px",
                    width: "100%",
                    background: "linear-gradient(145deg, #0a0f1f, #060b16)",
                    boxShadow: "0 0 25px rgba(0, 255, 255, 0.25)",
                    color: "#e6faff",
                    backdropFilter: "blur(6px)"
                }}
            >
                <h2
                    className="card-title text-center mb-3 fw-bold"
                    style={{
                        color: "#ff4d6d",
                        textShadow: "0 0 10px rgba(255, 77, 109, 0.7)"
                    }}
                >
                    Delete Photo
                </h2>

                <p
                    className="text-center mb-4"
                    style={{
                        color: "#b8f7ff",
                        fontSize: "1.05rem"
                    }}
                >
                    Are you sure you want to permanently delete this photo?
                </p>

                <div className="d-flex justify-content-center gap-3">
                    <button
                        className="btn btn-danger btn-lg px-4"
                        style={{
                            boxShadow: "0 0 12px rgba(255, 77, 109, 0.6)",
                            borderRadius: "999px"
                        }}
                        onClick={handleDelete}
                    >
                        🗑 Delete
                    </button>

                    <button
                        className="btn btn-outline-info btn-lg px-4"
                        style={{
                            borderRadius: "999px",
                            boxShadow: "0 0 12px rgba(0, 246, 255, 0.4)",
                            color: "#7ffcff",
                            borderColor: "#7ffcff"
                        }}
                        onClick={() => navigate(`/countries/${country}`)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}