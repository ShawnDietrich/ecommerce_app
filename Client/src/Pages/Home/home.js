import React from "react"
import Header from "../Components/header/header"
import About from "./about/about"
import ContactUs from "./contacts/contacts"

//Home page componentns
const Home = () => {
    return (
        <div className="HomeComponent">
            <Header/>
            <About/>
            <ContactUs/>
        </div>
    )
}

export default Home