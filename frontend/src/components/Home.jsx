import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = window.localStorage.getItem("token");
      const user = window.localStorage.getItem("user");
      if (!token || !user) {
        console.log("User is not logged in. Redireting to /signin");
        navigate("/signin");
      } else {
        navigate("/text");
      }
    } catch (error) {
      console.error(error);
      navigate("/signin");
    }
  });
  return null;
}
