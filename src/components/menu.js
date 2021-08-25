import { useAuthContext } from "./AuthContext";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Menu() {
  const { pathname } = useLocation();
  const { handleAuthentication } = useAuthContext();
  useEffect(() => {
    document.querySelectorAll(".dashLink").forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }, [pathname]);
  return (
    <div className="fixed top-1/3 -mt-16 left-4 z-50 bg-qosgray bg-opacity-90 max-w-xs grid grid-rows-3 rounded-xl p-2 gap-y-2 shadow-lg">
      <Link className="dashLink" to="/home/edit">
        <img
          className=""
          src=" https://image.flaticon.com/icons/png/512/2476/2476994.png"
          alt="rp"
        />
        <p className="text-mmd text-center">Editor</p>
      </Link>
      <Link className="dashLink" to="/home/account">
        <img
          className=""
          src="https://image.flaticon.com/icons/png/512/1250/1250689.png"
          alt="rp"
        />
        <p className="text-mmd text-center">Account</p>
      </Link>
      <Link className="dashLink " to="/home/published">
        <img
          className=""
          src="https://image.flaticon.com/icons/png/512/2961/2961948.png"
          alt="history"
        />
        <p className="text-mmd text-center">Published</p>
      </Link>
      <Link className="dashLink " to="/home/saved">
        <img
          className=""
          src="https://image.flaticon.com/icons/png/512/2874/2874091.png"
          alt="history"
        />
        <p className="text-mmd text-center">Saved</p>
      </Link>
      <button
        className="dashLink "
        onClick={() => handleAuthentication("LOGOUT")}
      >
        <img
          className=""
          src="https://image.flaticon.com/icons/png/512/1286/1286853.png"
          alt="logout"
        />
        <p className="text-mmd text-qosred text-center">Logout</p>
      </button>
    </div>
  );
}
