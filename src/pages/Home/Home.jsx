import "./Home.css"
import { useState } from "react"
import { NavLink } from "react-router";
import Modal from "../../components/Modal/Modal"

export default function Home() {

    let [ismodal1open, setismodal1open] = useState(false);
    let [ismodal2open, setismodal2open] = useState(false);

    return (
        <>
            <div className="home-body">

                <div className="info-intro">
                    <h1>Home</h1>
                    <p>Understanding proper training and nutrition is essential for building a healthy lifestyle. <br />
                        Click the buttons below to learn how to optimize your workouts and fuel your body.</p>
                </div>
                <div className="info-container">
                    {/* button to trigger fitness training modal */}
                    <button className="info-btn" onClick={() => setismodal1open(true)}>
                        fitness training
                    </button>
                    {/* modal component being used for fitness training info and advice */}
                    <Modal isopen={ismodal1open} onclose={() => setismodal1open(false)}>
                        🏋️‍♂️ Fitness Training <br /> <br />
                        Effective training isn't just about lifting heavy;
                        it's about intelligent programming, consistency, and proper recovery.

                        <br /> <br />
                        Progressive Overload (The Core Rule):
                        To build muscle strength and endurance, you must gradually increase
                        the demand on your musculoskeletal system over time. <br /> <br />

                        Actionable Tip: Track your weight, reps, or set count each week.
                        If you can complete your target reps easily, scale up the weight slightly
                        or add an extra repetition. <br /> <br />

                        Compound vs. Isolation Movements:
                        Prioritize multi-joint compound exercises
                        (like push-ups, pull-ups, squats, and overhead presses) early in your workout
                        when energy levels are highest. Use isolation movements
                        (like bicep curls or calf raises)
                        to target specific muscle groups afterwards. <br /> <br />

                        Recovery and Rest Intervals:

                        Muscles don't grow while you're lifting—they grow while you're resting
                        and repairing. Ensure 48 hours of recovery for a specific muscle group
                        before training it heavy again, and aim for 7–9 hours of quality sleep nightly.
                    </Modal>

                    {/* healthy living modal */}
                    <button className="info-btn" onClick={() => setismodal2open(true)}>
                        healthy living
                    </button>
                    <Modal isopen={ismodal2open} onclose={() => setismodal2open(false)}>
                        🥗 Section 2: Healthy Living & Nutrition  <br /> <br />
                        Physical performance is fueled by what you do outside the gym.
                        True wellness combines nutrition, hydration, and daily movement. <br /> <br />

                        Fueling and Macronutrients:
                        Protein: Essential for muscle repair (aim for lean sources
                        like chicken, fish, eggs, or lentils). <br /> <br />

                        Carbohydrates: Your body's primary energy source for
                        high-intensity training (focus on complex carbs like
                        oats, brown rice, etc). <br /> <br />

                        Healthy Fats: Crucial for hormone regulation and joint health
                        (avocados, nuts, olive oil).<br /> <br />

                        Hydration Metrics:
                        Dehydration drops physical performance, focus, and energy levels
                        significantly. Aim to drink consistently throughout the day, not
                        just when you feel thirsty during a workout. <br /> <br />

                        Daily Non-Exercise Activity (NEAT):
                        Maintaining a healthy
                        lifestyle relies on everyday movement—such as daily walking intervals,
                        taking stairs, and avoiding prolonged sedentary periods.
                    </Modal>
                </div>

                <div className="workouts-link">
                    <h1>Weekly Workouts</h1>
                    <NavLink to="/workouts">
                            <button className="workouts-btn">
                                Start Workout
                            </button>
                    </NavLink>
                </div>



            </div>
        </>
    )
}