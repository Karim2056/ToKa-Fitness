import "./About.css"
import Gym1 from "../../assets/gym-photo-1.jpg"
import Gym2 from "../../assets/gym-photo-2.jpg"

export default function Home() {
    return (
        <>
            <main className="main-content">

                {/* text first and then image 2nd, vice versa for "our mission" section */}
                
                <div className="intro-1">
                    <div className="intro-1-container">
                        <h1 style={{lineHeight:1}}>Who Are We?</h1>
                        <p>We’re more than just a gym — we’re a community built around strength, health, and confidence. Our goal is to create a motivating and welcoming environment where everyone, from beginners to experienced athletes, can work towards becoming their best self. With quality equipment, supportive guidance, and a positive atmosphere, we’re here to help you stay consistent, challenge your limits, and enjoy the journey towards a healthier, stronger you.</p>
                    </div>
                    <img className="gym-1" src={Gym1}></img>
                </div>
                <div className="intro-2">
                    <img className="gym-2" src={Gym2}/>
                    <div className="intro-2-container">
                        <h1 style={{lineHeight:1}}>Our Mission</h1>
                        <p>Our mission is to inspire people to become stronger, healthier, and more confident through fitness. We believe that every journey is different, which is why we aim to provide a supportive environment where everyone can set goals, push their limits, and make lasting progress. Whether you’re just starting out or looking to take your training to the next level, we’re here to help you stay motivated and reach your full potential.</p>
                    </div>
                </div>
                <div className="subscription">
                    
                </div>
            </main>
        </>
    )
}