import { useState, useEffect } from "react";

interface Dimension {
  width: number;
  height: number;
}

const getDimentions = (): Dimension => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimentions = (): Dimension => {
  const [windowDimensions, setWindowDimensions] = useState(getDimentions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getDimentions());
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export default useWindowDimentions;
