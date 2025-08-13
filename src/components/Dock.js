import React, { useState } from "react";
import { Howl } from "howler";

const Dock = ({ apps, onAppClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showShine, setShowShine] = useState(false);

  // Trigger shine animation after dock slides down
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowShine(true);
      // Reset shine state after animation completes
      setTimeout(() => setShowShine(false), 1500);
    }, 1200); // Wait 1.2 seconds for dock to fully slide down and settle
    
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

  return (
    <div
      className={`dock ${showShine ? 'dock-shine' : ''}`}
      style={{
        height: "91.43px", // 107.565px * 0.85
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(90deg, rgba(16,0,24,0.72) 0%, rgba(28,0,40,0.72) 100%)",
        backdropFilter: "blur(14.484px) saturate(180%)", // 17.04px * 0.85
        WebkitBackdropFilter: "blur(14.484px) saturate(180%)",
        border: "1.275px solid rgba(255,255,255,0.22)", // 1.5px * 0.85
        boxShadow: "0 1.8105px 4.5263px rgba(0, 0, 0, 0.2)", // 2.13px * 0.85, 5.325px * 0.85
        borderRadius: "16.2945px", // 19.17px * 0.85
        padding: "0 16.218px", // 19.08px * 0.85
        margin: "0 auto",
        width: "fit-content",
        minWidth: 0,
        position: "relative",
        marginTop: "3.168px", // 3.7275px * 0.85
        overflow: "hidden", // Needed for shine effect
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
          background: "linear-gradient(90deg, transparent 0%, rgba(200, 150, 255, 0.4) 30%, rgba(220, 180, 255, 0.6) 50%, rgba(200, 150, 255, 0.4) 70%, transparent 100%)",
          transform: showShine ? "translateX(-100%)" : "translateX(100%)", // RIGHT TO LEFT REVERSED: starts at 100% (right), moves to -100% (left)
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
                          margin: "0 13.579px", // 15.975px * 0.85
            cursor: "pointer",
            height: "100%",
          }}
        >
          <div
            className="dock-icon"
            style={{
              margin: "0",
              marginTop: "-5.432px", // -6.39px * 0.85
              transition: "transform 0.3s ease",
              transform: hoveredIndex === index ? "scale(1.2)" : "scale(1)",
            }}
          >
            {typeof app.icon === "string" ? (
              <span style={{ fontSize: "28.516px" }}>{app.icon}</span> // 31.684px * 0.9
            ) : (
              app.icon
            )}
          </div>
          <span
            style={{
              color: "white",
              fontSize: "15.389px", // 18.105px * 0.85
              marginTop: "-5.432px", // -6.39px * 0.85
              opacity: hoveredIndex === index ? 1 : 0.7,
              transition: "opacity 0.3s ease",
              textShadow: "0 1.811px 3.621px rgba(0, 0, 0, 0.5)", // 2.13px * 0.85, 4.26px * 0.85
              fontFamily:
                "'Inter', 'Montserrat', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: "300",
              letterSpacing: "0.362px", // 0.426px * 0.85
            }}
          >
            {app.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Dock;