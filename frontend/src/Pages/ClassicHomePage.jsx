
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useNavigate } from "react-router-dom";
export function ClassicHomePage() {
  const geoUrl = "https://raw.githubusercontent.com/leakyMirror/map-of-europe/master/TopoJSON/europe.topojson";
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "radial-gradient(circle at center, #050b14 0%, #020409 70%, #000 100%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <h1
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#00f6ff",
          letterSpacing: "2px",
          textShadow: "0 0 10px #00f6ff",
          fontWeight: "600"
        }}
      >
        PHOTO ALBUM 2099
      </h1>
      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10 }}>
        <button
          className="btn btn-outline-info"
          onClick={handleLogout}
          style={{
            color: "#00f6ff",
            borderColor: "#00f6ff",
            boxShadow: "0 0 10px rgba(0,246,255,0.6)"
          }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          width: "80vh",
          height: "80vh",
          borderRadius: "50%",
          position: "relative",
          overflow: "hidden",
          border: "2px solid rgba(0,246,255,0.6)",
          boxShadow: `
        0 0 40px rgba(0,246,255,0.6),
        inset 0 0 40px rgba(0,246,255,0.3)
      `,
          background: "radial-gradient(circle at center, #061a2b 0%, #020812 70%, #000 100%)"
        }}
      >

        <div style={{
          position: "absolute",
          inset: "10px",
          borderRadius: "50%",
          border: "1px dashed rgba(0,246,255,0.4)",
          pointerEvents: "none"
        }} />

        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.9) 100%)",
          pointerEvents: "none",
          zIndex: 2
        }} />

        <ComposableMap
          projection="geoAzimuthalEqualArea"
          width={1200}
          height={1200}
          projectionConfig={{
            scale: 900,
            center: [15, 55],
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => navigate(`/countries/${geo.properties.NAME}`)}
                  style={{
                    default: {
                      fill: "#0ef",
                      stroke: "#00f6ff",
                      strokeWidth: 0.4,
                      outline: "none",
                      opacity: 0.65
                    },
                    hover: {
                      fill: "#00f6ff",
                      stroke: "#ffffff",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                      opacity: 1
                    },
                    pressed: {
                      fill: "#00aaff",
                      stroke: "#ffffff",
                      strokeWidth: 1.2,
                      outline: "none"
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>



  );
}