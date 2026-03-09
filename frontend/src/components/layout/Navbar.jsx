import Logo from "../common/Logo";
import { Icon } from "../common/Icon";
import { useAuth } from "../../context/AuthContext";
import { AuthService } from "../../api/services/AuthService";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await AuthService.signOut();
      navigate("/admin");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-(--db-caadi) w-full h-24 flex items-center shadow-md justify-between">
      <a href="/">
        <Logo
          src="/assets/logo-caadi.svg"
          alt="Logo CAADI"
          className="w-20 h-20 mx-4"
        />
      </a>

      <div className="flex items-center gap-4 mx-4">
        <a href="/reclamos" className="flex items-center gap-3 text-white">
          <Icon name={"reclamos"} className="text-white w-12 h-12" />
          <span className="text-sm md:text-base">Realizar reclamo</span>
        </a>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm md:text-base cursor-pointer"
          >
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;