import Logo from "../common/Logo";

function Navbar() {
    return (
        <nav className="bg-(--db-caadi) w-full h-24 flex items-center shadow-md">
            <a href="/"><Logo src="/assets/logo-caadi.svg" alt="Logo CAADI" className="w-20 h-20 mx-2.5" /></a>
        </nav>
    );
}

export default Navbar;