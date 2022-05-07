import { header } from "express/lib/request";
import react from "react";
import './header.css'


const Header = () =>{
    return (
        <>
            <div className="headerTitle">
                <h1>This is the header</h1>
            </div>
        </>
    )
}

export default Header;