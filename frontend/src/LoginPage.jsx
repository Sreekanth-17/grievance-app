import React, { useState, useEffect } from "react";
import photo1 from "./assets/images/photo1.jpg";
import photo3 from "./assets/images/photo3.jpg";
import photo4 from "./assets/images/photo4.jpg";
import photo5 from "./assets/images/photo5.jpg";

const imagesLeft = [photo1, photo3];
const imagesRight = [photo4, photo5];

const MAX_IMAGE_WIDTH = 180;  // max width for images (adjust as needed)
const MAX_IMAGE_HEIGHT = 250; // max height for images (adjust as needed)
const GAP = 30;               // vertical gap between images

const LoginPage = ({ onLogin }) => {
  const [imageSizes, setImageSizes] = useState({});

  // Load natural sizes
  useEffect(() => {
    const sizes = {};
    let loadedCount = 0;
    const imgs = [...imagesLeft, ...imagesRight];

    imgs.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        sizes[src] = { width: img.naturalWidth, height: img.naturalHeight };
        loadedCount++;
        if (loadedCount === imgs.length) {
          setImageSizes(sizes);
        }
      };
    });
  }, []);

  // Helper: calculate scaled size maintaining aspect ratio
  const getScaledSize = (width, height) => {
    let scale = Math.min(
      MAX_IMAGE_WIDTH / width,
      MAX_IMAGE_HEIGHT / height,
      1 // no upscale
    );
    return {
      width: width * scale,
      height: height * scale,
    };
  };

  // Positions of images
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  const centerY = windowHeight / 2;
  const formWidth = 350; // fixed width of form container

  const getLeftPositions = () => {
    if (!imageSizes || Object.keys(imageSizes).length === 0) return [];
    const [img1, img2] = imagesLeft;
    const size1 = getScaledSize(
      imageSizes[img1].width,
      imageSizes[img1].height
    );
    const size2 = getScaledSize(
      imageSizes[img2].width,
      imageSizes[img2].height
    );

    const totalHeight = size1.height + size2.height + GAP;
    const startY = centerY - totalHeight / 2;

    return [
      {
        top: startY,
        left: GAP,
        width: size1.width,
        height: size1.height,
      },
      {
        top: startY + size1.height + GAP,
        left: GAP + 40, // slight diagonal right shift
        width: size2.width,
        height: size2.height,
      },
    ];
  };

  const getRightPositions = () => {
    if (!imageSizes || Object.keys(imageSizes).length === 0) return [];
    const [img1, img2] = imagesRight;
    const size1 = getScaledSize(
      imageSizes[img1].width,
      imageSizes[img1].height
    );
    const size2 = getScaledSize(
      imageSizes[img2].width,
      imageSizes[img2].height
    );

    const totalHeight = size1.height + size2.height + GAP;
    const startY = centerY - totalHeight / 2;

    return [
      {
        top: startY,
        left: windowWidth - size1.width - GAP - 40,
        width: size1.width,
        height: size1.height,
      },
      {
        top: startY + size1.height + GAP,
        left: windowWidth - size2.width - GAP,
        width: size2.width,
        height: size2.height,
      },
    ];
  };

  const leftPositions = getLeftPositions();
  const rightPositions = getRightPositions();

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "Kunjaaaa" && password === "Ilovevava") {
      onLogin();
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        userSelect: "none",
        backgroundImage:
          "linear-gradient(135deg, #b78cf0 0%, #a56edc 25%, #8a68d1 50%, #cba2f7 75%, #e5ccff 100%)",
      }}
    >
      {/* Overlay pattern with bigger darker dots */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0, // behind images (which have zIndex:1) and form (zIndex:10)
          backgroundImage: `
            radial-gradient(circle 8px at 8px 8px, rgba(72, 44, 120, 0.3) 100%, transparent 100%),
            radial-gradient(circle 8px at 32px 32px, rgba(72, 44, 120, 0.3) 100%, transparent 100%)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.3,
        }}
      ></div>

      {/* Left Images */}
      {leftPositions.length === imagesLeft.length &&
        imagesLeft.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`left-img-${i}`}
            style={{
              position: "fixed",
              top: leftPositions[i].top,
              left: leftPositions[i].left,
              width: leftPositions[i].width,
              height: leftPositions[i].height,
              borderRadius: 20,
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              objectFit: "contain",
              zIndex: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        ))}

      {/* Right Images */}
      {rightPositions.length === imagesRight.length &&
        imagesRight.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`right-img-${i}`}
            style={{
              position: "fixed",
              top: rightPositions[i].top,
              left: rightPositions[i].left,
              width: rightPositions[i].width,
              height: rightPositions[i].height,
              borderRadius: 20,
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
              objectFit: "contain",
              zIndex: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        ))}

      {/* Login form */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-xl max-w-[350px] w-full z-10"
        style={{ userSelect: "auto" }}
      >
        {/* Funny heading */}
        <p
          className="text-center text-purple-700 mb-4 italic font-semibold"
          style={{ fontSize: "1.1rem" }}
        >
          Kunjaa's Personal Complaint Box (No issue is too small!😄)
        </p>

        <h2 className="text-3xl font-bold text-center text-purple-900 mb-8">
          Welcome 💜
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-5 p-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-7 p-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-purple-700 hover:shadow-lg transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
