import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
export function EditFormPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [countryId, setCountryId] = useState("");
    const [photo, setPhoto] = useState({ title: "", url: "", description: "" });
    const [preEditedCountryName, setPreEditedCountryName] = useState("");
    useEffect(() => {
        fetch(`http://localhost:8080/api/photos/${id}`).
            then((response) => response.json()).
            then((data) => {
                setPhoto(data);
                setCountryId(data.countryId);
                setPreEditedCountryName(data.countryName);

            });
    }, [id]);
    useEffect(() => {
        fetch(`http://localhost:8080/api/countries`).
            then((response) => response.json()).
            then((data) => setCountries(data));
    }, []);
    const handleSave = () => {
        const updatedPhoto = { ...photo, country: { id: countryId } };

        fetch(`http://localhost:8080/api/photos/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPhoto)
        }).then((response) => {
            if (response.ok) {
                navigate("/countries/" + preEditedCountryName);
            } else {
                alert("Failed to save changes");
            }
        });
    };

    return (
        <>
            <div
                className="container my-5 d-flex justify-content-center"
                style={{ maxWidth: "1100px" }}
            >
                <div
                    className="card border-0 shadow-lg"
                    style={{
                        background: "linear-gradient(135deg, #050b14, #0b1a2a)",
                        borderRadius: "20px",
                        color: "#00f6ff",
                        boxShadow: "0 0 30px rgba(0,246,255,0.25)"
                    }}
                >
                    <div className="card-body p-5">
                        <h2
                            className="card-title mb-4 text-center fw-bold"
                            style={{
                                letterSpacing: "2px",
                                textShadow: "0 0 10px rgba(0,246,255,0.7)"
                            }}
                        >
                            EDIT PHOTO
                        </h2>

                        <form>
                            <div className="mb-4">
                                <label className="form-label fw-semibold">Title</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={photo.title}
                                    onChange={(e) => setPhoto({ ...photo, title: e.target.value })}
                                    style={{
                                        background: "rgba(0,0,0,0.6)",
                                        border: "1px solid #00f6ff",
                                        color: "#00f6ff",
                                        boxShadow: "0 0 10px rgba(0,246,255,0.4)"
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Image URL</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={photo.url}
                                    onChange={(e) => setPhoto({ ...photo, url: e.target.value })}
                                    style={{
                                        background: "rgba(0,0,0,0.6)",
                                        border: "1px solid #00f6ff",
                                        color: "#00f6ff",
                                        boxShadow: "0 0 10px rgba(0,246,255,0.4)"
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Description</label>
                                <textarea
                                    className="form-control form-control-lg"
                                    rows="4"
                                    value={photo.description}
                                    onChange={(e) => setPhoto({ ...photo, description: e.target.value })}
                                    style={{
                                        background: "rgba(0,0,0,0.6)",
                                        border: "1px solid #00f6ff",
                                        color: "#00f6ff",
                                        boxShadow: "0 0 10px rgba(0,246,255,0.4)"
                                    }}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Country</label>
                                <select
                                    className="form-select form-select-lg"
                                    value={countryId}
                                    onChange={(e) => setCountryId(e.target.value)}
                                    required
                                    style={{
                                        background: "rgba(0,0,0,0.8)",
                                        border: "1px solid #00f6ff",
                                        color: "#ffffff",               
                                        boxShadow: "0 0 10px rgba(0,246,255,0.4)"
                                    }}
                                >
                                    <option value="" style={{ color: "#ffffff" }}>
                                        Select a country
                                    </option>
                                    {countries.map((country) => (
                                        <option
                                            key={country.id}
                                            value={country.id}
                                            style={{ color: "#ffffff" }}  
                                        >
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="d-flex justify-content-between mt-5">
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="btn btn-lg"
                                    style={{
                                        background: "#00f6ff",
                                        color: "#020409",
                                        fontWeight: "600",
                                        boxShadow: "0 0 15px rgba(0,246,255,0.8)"
                                    }}
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/countries/" + preEditedCountryName)}
                                    className="btn btn-lg"
                                    style={{
                                        color: "#00f6ff",
                                        border: "1px solid #00f6ff",
                                        background: "transparent",
                                        boxShadow: "0 0 10px rgba(0,246,255,0.6)"
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}