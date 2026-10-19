import React, { useState } from "react";
import LoggedFooter from "../../components/LoggedFooter/LoggedFooter";
import LoggedHeader from "../../components/LoggedHeader/LogedHeader";
import "./Workouts.css";

// Workout data library mapped by goal
const WORKOUT_DATABASE = {
  "Muscle Gain": {
    description: "Focus on hypertrophy, progressive overload, and compound movements.",
    videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg", // Replace with your desired YouTube Embed URL
    exercises: [
      "Bench Press: 4 sets x 8-10 reps",
      "Barbell Squats: 4 sets x 8-10 reps",
      "Deadlifts: 3 sets x 5 reps",
      "Overhead Press: 3 sets x 8-12 reps",
      "Dumbbell Bicep Curls: 3 sets x 12 reps"
    ]
  },
  "Fat Loss": {
    description: "High-intensity metabolic conditioning combined with short rest intervals.",
    videoUrl: "https://www.youtube.com/embed/ml6cT4AZdqI", // Replace with your desired YouTube Embed URL
    exercises: [
      "Jumping Jacks: 45 secs ON / 15 secs OFF",
      "Burpees: 45 secs ON / 15 secs OFF",
      "Mountain Climbers: 45 secs ON / 15 secs OFF",
      "Kettlebell Swings: 4 sets x 15 reps",
      "High Knees: 45 secs ON / 15 secs OFF"
    ]
  },
  "Mobility & Flexibility": {
    description: "Joint mobilization, dynamic stretching, and postural stability drills.",
    videoUrl: "https://www.youtube.com/embed/aRQ76vbF2q8?si=tvjDWigkVRA24X-5", // Replace with your desired YouTube Embed URL
    exercises: [
      "Cat-Cow Stretches: 2 minutes",
      "World's Greatest Stretch: 5 reps per side",
      "Hip 90/90 Transitions: 10 reps",
      "Thoracic Spine Rotations: 10 reps per side",
      "Child's Pose Hold: 2 minutes"
    ]
  }
};

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WORKOUT_GOALS = ["Muscle Gain", "Fat Loss", "Mobility & Flexibility"];

export default function Workouts() {
  // State for user preferences
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState("Muscle Gain");

  // State to control view visibility
  const [showPlan, setShowPlan] = useState(false);

  // Toggle selection of workout days
  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Generate or reset workout view
  const handleGeneratePlan = () => {
    if (selectedDays.length === 0) {
      alert("Please select at least one workout day!");
      return;
    }
    setShowPlan(true);
  };

  const handleReset = () => {
    setShowPlan(false);
  };

  const currentWorkout = WORKOUT_DATABASE[selectedGoal];

  return (
    <>
      <LoggedHeader />
      <div className="workouts-body">
        <div className="workouts-container">
          <header className="workouts-header">
            <h1>Weekly Workout Planner</h1>
            <p>Customize your schedule and goal to reveal your routine.</p>
          </header>

          {!showPlan ? (
            /* CONFIGURATION FORM VIEW */
            <div className="workout-config-card">
              {/* Step 1: Select Days */}
              <section className="config-section">
                <h3>1. Select Workout Days</h3>
                <div className="days-selector">
                  {DAYS_OF_WEEK.map((day) => (
                    <button
                      key={day}
                      type="button"
                      className={`day-btn ${selectedDays.includes(day) ? "active" : ""}`}
                      onClick={() => handleDayToggle(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </section>

              {/* Step 2: Select Goal */}
              <section className="config-section">
                <h3>2. Choose Your Goal</h3>
                <div className="goals-selector">
                  {WORKOUT_GOALS.map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      className={`goal-btn ${selectedGoal === goal ? "active" : ""}`}
                      onClick={() => setSelectedGoal(goal)}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </section>

              {/* Submit Button */}
              <button className="cta-btn" onClick={handleGeneratePlan}>
                Generate My Workout Routine &rarr;
              </button>
            </div>
          ) : (
            /* WORKOUT DISPLAY VIEW */
            <div className="workout-plan-card">
              <button className="back-btn" onClick={handleReset}>
                &larr; Adjust Preferences
              </button>

              <div className="plan-header">
                <h2>{selectedGoal} Routine</h2>
                <div className="scheduled-days-badge">
                  <strong>Scheduled Days:</strong> {selectedDays.join(", ")}
                </div>
              </div>

              <p className="plan-description">{currentWorkout.description}</p>

              <div className="workout-content-grid">
                {/* Exercise List */}
                <div className="exercise-list-container">
                  <h3>Recommended Exercises</h3>
                  <ul className="exercise-list">
                    {currentWorkout.exercises.map((exercise, index) => (
                      <li key={index}>{exercise}</li>
                    ))}
                  </ul>
                </div>

                {/* Video Tutorial */}
                <div className="video-container">
                  <h3>Follow-Along Video</h3>
                  <div className="video-responsive">
                    <iframe
                      src={currentWorkout.videoUrl}
                      title={`${selectedGoal} Workout Tutorial`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <LoggedFooter />
    </>
  );
}