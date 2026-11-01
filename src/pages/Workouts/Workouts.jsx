import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Workouts.css";

const WORKOUT_DATABASE = {
  "Muscle Gain": {
    description: "Focus on hypertrophy, progressive overload, and compound movements.",
    videoUrl: "https://www.youtube.com/embed/rT7DgCr-3pg",
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
    videoUrl: "https://www.youtube.com/embed/ml6cT4AZdqI",
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
    videoUrl: "https://www.youtube.com/embed/aRQ76vbF2q8?si=tvjDWigkVRA24X-5",
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
const API_URL = "http://127.0.0.1:8001"; // Match your backend port (8000 or 8001)

export default function Workouts() {
  const [daysState, setDaysState] = useState({
    Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false
  });
  const [selectedGoal, setSelectedGoal] = useState("Muscle Gain");
  const [showPlan, setShowPlan] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pulls the logged-in username from Local Storage
  const currentUsername = localStorage.getItem("username") || "guest";

  // 1. LOAD DATA: Fetch from FastAPI using Axios GET
  useEffect(() => {
    axios.get(`${API_URL}/workout/${currentUsername}`)
      .then(response => {
        console.log("Loaded workout preferences:", response.data);
        if (response.data && response.data.days) {
          setDaysState(response.data.days);
          setSelectedGoal(response.data.selected_goal || "Muscle Gain");
          
          const hasActiveDays = Object.values(response.data.days).some((val) => val === true);
          if (hasActiveDays) {
            setShowPlan(true);
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Failed to load workout preferences:", error);
        setLoading(false);
      });
  }, [currentUsername]);

  // 2. SAVE DATA: Send to FastAPI using Axios POST
  const savePreferencesToBackend = (updatedDays, goalToSave) => {
    const payload = {
      username: currentUsername,
      selected_goal: goalToSave,
      days: updatedDays
    };

    axios.post(`${API_URL}/workout`, payload)
      .then(response => {
        console.log("Workout preferences saved successfully:", response.data);
      })
      .catch(error => {
        const detail = error.response?.data?.detail || "Failed to save workout preferences";
        console.error("Save failed:", detail);
      });
  };

  const handleDayToggle = (day) => {
    const updatedDays = {
      ...daysState,
      [day]: !daysState[day] // Flips true/false
    };
    setDaysState(updatedDays);
    savePreferencesToBackend(updatedDays, selectedGoal);
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    savePreferencesToBackend(daysState, goal);
  };

  const handleGeneratePlan = () => {
    const hasSelectedDay = Object.values(daysState).some((val) => val === true);
    if (!hasSelectedDay) {
      alert("Please select at least one workout day!");
      return;
    }
    setShowPlan(true);
  };

  const handleReset = () => {
    setShowPlan(false);
  };

  if (loading) {
    return <div className="workouts-body"><p style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Loading your workout plan...</p></div>;
  }

  const currentWorkout = WORKOUT_DATABASE[selectedGoal];
  const scheduledDaysList = DAYS_OF_WEEK.filter((day) => daysState[day]);

  return (
    <div className="workouts-body">
      <div className="workouts-container">
        <header className="workouts-header">
          <h1>Weekly Workout Planner</h1>
          <p>Logged in as: <strong>{currentUsername}</strong></p>
        </header>

        {!showPlan ? (
          <div className="workout-config-card">
            <section className="config-section">
              <h3>1. Select Workout Days</h3>
              <div className="days-selector">
                {DAYS_OF_WEEK.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={`day-btn ${daysState[day] ? "active" : ""}`}
                    onClick={() => handleDayToggle(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </section>

            <section className="config-section">
              <h3>2. Choose Your Goal</h3>
              <div className="goals-selector">
                {WORKOUT_GOALS.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    className={`goal-btn ${selectedGoal === goal ? "active" : ""}`}
                    onClick={() => handleGoalSelect(goal)}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </section>

            <button className="cta-btn" onClick={handleGeneratePlan}>
              Generate My Workout Routine &rarr;
            </button>
          </div>
        ) : (
          <div className="workout-plan-card">
            <button className="back-btn" onClick={handleReset}>
              &larr; Adjust Preferences
            </button>

            <div className="plan-header">
              <h2>{selectedGoal} Routine</h2>
              <div className="scheduled-days-badge">
                <strong>Scheduled Days:</strong> {scheduledDaysList.join(", ")}
              </div>
            </div>

            <p className="plan-description">{currentWorkout.description}</p>

            <div className="workout-content-grid">
              <div className="exercise-list-container">
                <h3>Recommended Exercises</h3>
                <ul className="exercise-list">
                  {currentWorkout.exercises.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              </div>

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
  );
}