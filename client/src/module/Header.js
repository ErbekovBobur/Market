import Weather from "../component/Weather/Weather.js";
import NavbarN from "../component/Navbar/Navbar.js";

function Header() {
    return (
        <>
            <NavbarN />
            <Weather />
        </>
    )
}

export default Header;