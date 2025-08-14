import React, { useState } from "react";
import { Howl } from "howler";

const Dock = ({ apps, onAppClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showShine, setShowShine] = useState(false);

  // Trigger shine animation after dock slides down
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowShine(true);
      setTimeout(() => setShowShine(false), 1500);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const clickSound = new Howl({
    src: ["/click.mp3"],
    volume: 0.5,
    html5: true,
  });

  const hoverSound = new Howl({
    src: ["/whoosh.wav"],
    volume: 0.3,
    html5: true,
  });

  const handleAppClick = (app) => {
    clickSound.play();
    if (app.name !== "My Resume") {
      onAppClick(app.name);
    }
  };

  const handleAppDoubleClick = (app) => {
    if (app.name === "My Resume") {
      window.open("https://flowcv.com/resume/u2ckr5r2ktsk", "_blank");
    } else {
      onAppClick(app.name);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    hoverSound.play();
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  // 20% shrink = scale(0.8)
  return (
    <div
      style={{
        width: "fit-content",
        margin: "0 auto",
        marginTop: "3.5px",
        transform: "scale(0.8)",
        transformOrigin: "top center",
      }}
    >
      <div
        className={`dock ${showShine ? 'dock-shine' : ''}`}
        style={{
          height: "101px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(90deg, rgba(16,0,24,0.72) 0%, rgba(28,0,40,0.72) 100%)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: "1.5px solid rgba(255,255,255,0.22)",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          borderRadius: "18px",
          padding: "0 32px",
          margin: "0 auto",
          width: "fit-content",
          minWidth: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shine overlay */}
        <div
          className={`shine-overlay ${showShine ? 'shine-active' : ''}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(200, 150, 255, 0.4) 30%, rgba(220, 180, 255, 0.6) 50%, rgba(200, 150, 255, 0.4) 70%, transparent 100%)",
            transform: showShine ? "translateX(-100%)" : "translateX(100%)",
            transition: "transform 1.2s ease-in-out",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {apps.map((app, index) => (
          <div
            key={index}
            className="dock-icon-container"
            onClick={() => handleAppClick(app)}
            onDoubleClick={() => handleAppDoubleClick(app)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 15px",
              cursor: "pointer",
              height: "100%",
            }}
          >
            <div
              className="dock-icon"
              style={{
                margin: "0",
                marginTop: "-6px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                transform: hoveredIndex === index ? "scale(1.2)" : "scale(1)",
                textShadow:
                  hoveredIndex === index
                    ? "0 0 20px rgba(255, 255, 255, 0.8)"
                    : "none",
              }}
            >
              {typeof app.icon === "string" ? (
                <span style={{ fontSize: "35px" }}>{app.icon}</span>
              ) : (
                app.icon
              )}
            </div>
            <span
              style={{
                color: "white",
                fontSize: "17px",
                marginTop: "-6px",
                opacity: hoveredIndex === index ? 1 : 0.7,
                transition: "opacity 0.3s ease",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
                fontFamily:
                  "'Inter', 'Montserrat', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontWeight: "300",
                letterSpacing: "0.4px",
              }}
            >
              {app.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dock;