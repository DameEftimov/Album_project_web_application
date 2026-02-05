import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password }
        const res = await fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        })
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.token);
            navigate("/");
            setUsername("");
            setPassword("");
        }
        else {
            alert("Login failed.");
        }
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                <div
                    className="card border-0 rounded-4 p-5"
                    style={{
                        maxWidth: "420px",
                        width: "100%",
                        background: "linear-gradient(145deg, #0a0f1f, #060b16)",
                        boxShadow: "0 0 30px rgba(0, 255, 255, 0.25)",
                        color: "#e6faff",
                        backdropFilter: "blur(6px)"
                    }}
                >
                    <h2
                        className="text-center mb-4 fw-bold"
                        style={{
                            color: "#7ffcff",
                            textShadow: "0 0 10px rgba(0, 246, 255, 0.8)"
                        }}
                    >
                        🔐 Login
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label" style={{ color: "#9ffcff" }}>
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-lg bg-dark text-light border-0"
                                style={{
                                    boxShadow: "inset 0 0 8px rgba(0, 246, 255, 0.3)",
                                }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label" style={{ color: "#9ffcff" }}>
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control form-control-lg bg-dark text-light border-0"
                                style={{
                                    boxShadow: "inset 0 0 8px rgba(0, 246, 255, 0.3)",
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-info btn-lg w-100"
                            style={{
                                boxShadow: "0 0 12px rgba(0, 246, 255, 0.7)",
                                borderRadius: "999px",
                                fontWeight: "600"
                            }}
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-4 text-center" style={{ color: "#b8f7ff" }}>
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            style={{
                                color: "#7ffcff",
                                textDecoration: "none",
                                textShadow: "0 0 6px rgba(0, 246, 255, 0.6)"
                            }}
                        >
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}