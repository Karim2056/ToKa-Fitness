import "./About.css"
import Gym1 from "../../assets/gym-photo-1.jpg"
import Gym2 from "../../assets/gym-photo-2.jpg"
import Smartwatch from "../../assets/smartwatch.jpg"
import Mindfulness from "../../assets/mindfulness.jpg"
import { NavLink } from "react-router"
import { useState } from "react"

export default function About() {

    const [loggedin, setloggedin] = useState(localStorage.getItem("loggedin") === "true");

    let maincontent = {};

    if (loggedin) {
        maincontent = {
            paddingTop: "100px",
            paddingBottom: "100px",
        }
    }


    return (
        <>
            <main className="main-content" style={maincontent}>

                {/* text first and then image 2nd, vice versa for "our mission" section */}

                <div className="intro-1">
                    <div className="intro-1-container">
                        <h1 style={{ lineHeight: 1 }}>Who Are We?</h1>
                        <p>We’re more than just a gym — we’re a community built around strength, health, and confidence. Our goal is to create a motivating and welcoming environment where everyone, from beginners to experienced athletes, can work towards becoming their best self. With quality equipment, supportive guidance, and a positive atmosphere, we’re here to help you stay consistent, challenge your limits, and enjoy the journey towards a healthier, stronger you.</p>
                    </div>
                    <img className="gym-1" src={Gym1}></img>
                </div>
                <div className="intro-2">
                    <img className="gym-2" src={Gym2} />
                    <div className="intro-2-container">
                        <h1 style={{ lineHeight: 1 }}>Our Mission</h1>
                        <p>Our mission is to inspire people to become stronger, healthier, and more confident through fitness. We believe that every journey is different, which is why we aim to provide a supportive environment where everyone can set goals, push their limits, and make lasting progress. Whether you’re just starting out or looking to take your training to the next level, we’re here to help you stay motivated and reach your full potential.</p>
                    </div>
                </div>
                {/* this section is for subscription tiers */}

                {!loggedin && (
                    <>
                        <div className="subscription-label">
                            <h1>Memberships</h1>
                            <p>choose your plan</p>
                        </div>
                        <div className="subscription">
                            <div className="tiers">
                                <h3>Tier 1</h3>
                                <p>
                                    • fitness and health advice <br />
                                    • available workouts
                                </p>
                                <div className="btn-container">
                                    <NavLink className="tier-btn-link" to="/signup">
                                        <button className="tier-btn">free</button>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="tiers">
                                <h3>Tier 2</h3>
                                <p>
                                    • fitness and health advice <br />
                                    • available workouts <br />
                                    • calorie tracker <br />
                                    • recommended meals
                                </p>
                                <div className="btn-container">
                                    <NavLink className="tier-btn-link" to="/signup">
                                        <button className="tier-btn">£5 / month</button>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="tiers">
                                <h3>Tier 3</h3>
                                <p>
                                    • fitness and health advice <br />
                                    • available workouts <br />
                                    • calorie tracker <br />
                                    • recommended meals <br />
                                    • social features
                                </p>
                                <div className="btn-container">
                                    <NavLink className="tier-btn-link" to="/signup">
                                        <button className="tier-btn">£10 / month</button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <div className="ad-container">
                    <h1>More ToKa Services</h1>
                    <div className="services-container">
                        <div className="ad-card">
                            <h2>ToKa Motion</h2>
                            <img className="smartwatch" src={Smartwatch} />
                            <p>smartwatch fitness app</p>
                        </div>
                        <div className="ad-card">
                            <h2>ToKa Mind & Recovery</h2>
                            <img className="mindfulness" src={Mindfulness} />
                            <p>meditation app</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}