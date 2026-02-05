import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function UploadFormPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    const { name } = useParams();
    console.log("")
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        const newPhoto = { title, url, description, country: { name: name } };
        fetch("http://localhost:8080/api/photos/upload", {
            method: "POST",
            headers,
            body: JSON.stringify(newPhoto),
        })
            .then((response) => {
                if (response.ok) {
                    navigate(`/countries/${name}`);
                    setTitle("");
                    setUrl("");
                    setDescription("");
                } else {
                    alert("Error uploading photo");
                }
            })
            .catch((error) => console.error("Error:", error));
    };


    return (
        <>
            <div
                className="container d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh" }}
            >
                <div
                    className="card p-5 rounded-4"
                    style={{
                        maxWidth: "600px",
                        width: "100%",
                        background: "rgba(10, 10, 25, 0.85)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(0, 246, 255, 0.5)",
                        boxShadow: "0 0 30px rgba(0, 246, 255, 0.35)",
                        color: "#e6faff",
                    }}
                >
                    <h2
                        className="text-center mb-4 fw-bold"
                        style={{
                            color: "#00f6ff",
                            textShadow: "0 0 10px rgba(0,246,255,0.8)",
                            letterSpacing: "1px",
                        }}
                    >
                        Upload New Photo
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-semibold" style={{ color: "#9ffcff" }}>
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{
                                    background: "rgba(0,0,0,0.7)",
                                    border: "1px solid #00f6ff",
                                    color: "#ffffff",
                                    boxShadow: "0 0 10px rgba(0,246,255,0.3)",
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold" style={{ color: "#9ffcff" }}>
                                Image URL
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                required
                                style={{
                                    background: "rgba(0,0,0,0.7)",
                                    border: "1px solid #00f6ff",
                                    color: "#ffffff",
                                    boxShadow: "0 0 10px rgba(0,246,255,0.3)",
                                }}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-semibold" style={{ color: "#9ffcff" }}>
                                Description
                            </label>
                            <textarea
                                className="form-control form-control-lg"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{
                                    background: "rgba(0,0,0,0.7)",
                                    border: "1px solid #00f6ff",
                                    color: "#ffffff",
                                    boxShadow: "0 0 10px rgba(0,246,255,0.3)",
                                }}
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-lg"
                                style={{
                                    background: "linear-gradient(135deg, #00f6ff, #7f00ff)",
                                    border: "none",
                                    color: "#000",
                                    fontWeight: "bold",
                                    letterSpacing: "1px",
                                    padding: "12px 40px",
                                    boxShadow: "0 0 20px rgba(0,246,255,0.6)",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) =>
                                (e.currentTarget.style.boxShadow =
                                    "0 0 35px rgba(127,0,255,0.9)")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.boxShadow =
                                    "0 0 20px rgba(0,246,255,0.6)")
                                }
                            >
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}