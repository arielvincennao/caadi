import Logo from "../common/Logo";
import { Icon } from "../common/Icon";
function Navbar() {
    return (
        <nav className="bg-(--db-caadi) w-full h-24 flex items-center shadow-md justify-between">
            <a href="/"><Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className="w-20 h-20 mx-2.5" /></a>
            <a href="/reclamos"><Icon name={"reclamos"} className="text-white w-15 h-15 mx-2.5" /></a>
        </nav>
    );
}

export default Navbar;