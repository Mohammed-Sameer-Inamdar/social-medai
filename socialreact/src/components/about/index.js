import React from "react"
import { Link } from "react-router-dom"

const AboutPage = () => {
    return (
        <section className="public">
            <header>
                <h1 className='p-6'>Welcome to our world!</h1>
            </header>
            <main>
                <p>Located in your mind and do whatever you want as your wish.</p>
                <p>&nbsp;</p>
                <address>
                    world.in<br />
                </address>
            </main>
            <footer>
                <Link to="/login">Login</Link>
            </footer>
        </section>
    )

}
export default AboutPage;