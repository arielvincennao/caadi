import Logo from "../common/Logo";
import { Icon } from "../common/Icon";
function Navbar() {
    return (
        <nav className="bg-(--db-caadi) w-full h-24 flex items-center shadow-md justify-between">
            <a href="/"><Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className="w-20 h-20 mx-4" /></a>
            <a href="/reclamos" className="flex items-center gap-3 text-white mx-4">
                <Icon name={"reclamos"} className="text-white w-12 h-12" />
                <span className="text-sm md:text-base">Realizar reclamo</span>
            </a>
        </nav>
    );
}

export default Navbar;