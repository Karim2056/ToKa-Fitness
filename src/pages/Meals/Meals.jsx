import React, { useState } from "react";
import "./Meals.css";
import LoggedHeader from "../../components/LoggedHeader/LogedHeader";
import LoggedFooter from "../../components/LoggedFooter/LoggedFooter";

// Sample recommended meals data
const RECOMMENDED_MEALS = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    calories: 350,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "Chicken breast",
      "Mixed greens (spinach, arugula)",
      "Cherry tomatoes",
      "Cucumbers",
      "Olive oil & Lemon dressing"
    ],
    videoUrl: "https://www.youtube.com/embed/1TcnC2S8YmU"
  },
  {
    id: 2,
    name: "Salmon Avocado Bowl",
    calories: 520,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "Fresh salmon fillet",
      "Avocado",
      "Brown rice",
      "Edamame beans",
      "Soy sesame dressing"
    ],
    videoUrl: "https://www.youtube.com/embed/1TcnC2S8YmU"
  },
  {
    id: 3,
    name: "Berry Oatmeal Bowl",
    calories: 280,
    image: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?auto=format&fit=crop&w=600&q=80",
    ingredients: [
      "Rolled oats",
      "Almond milk",
      "Fresh blueberries & strawberries",
      "Chia seeds",
      "Honey"
    ],
    videoUrl: "https://www.youtube.com/embed/1TcnC2S8YmU"
  }
];

export default function Meals() {
  // State for active expanded card modal/details
  const [selectedMeal, setSelectedMeal] = useState(null);

  // State for Calorie Tracker
  const [loggedMeals, setLoggedMeals] = useState([
    { id: 1, name: "Oatmeal with Milk", calories: 250 },
    { id: 2, name: "Protein Shake", calories: 180 }
  ]);
  const [foodName, setFoodName] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");

  // Handle adding new meal to the tracker
  const handleAddMeal = (e) => {
    e.preventDefault();
    if (!foodName.trim() || !caloriesInput) return;

    const newMeal = {
      id: Date.now(),
      name: foodName.trim(),
      calories: Number(caloriesInput)
    };

    setLoggedMeals([...loggedMeals, newMeal]);
    setFoodName("");
    setCaloriesInput("");
  };

  // Calculate total calories
  const totalCalories = loggedMeals.reduce((sum, item) => sum + item.calories, 0);

  return (
    <>
      <LoggedHeader />

      <div className="meals-body">
        {/* SECTION 1: Recommended Meals */}
        <section className="meals-section">
          <h2 className="section-title">Recommended Meals</h2>
          <div className="meals-grid">
            {RECOMMENDED_MEALS.map((meal) => (
              <div
                key={meal.id}
                className="meal-card"
                onClick={() => setSelectedMeal(meal)}
              >
                <div className="card-image-container">
                  <img src={meal.image} alt={meal.name} className="meal-image" />
                </div>
                <div className="card-content">
                  <h3 className="meal-name">{meal.name}</h3>
                  <p className="meal-calories">{meal.calories} kcal</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Modal for Card Click (Shows Ingredients & Video Tutorial) */}
        {selectedMeal && (
          <div className="modal-overlay" onClick={() => setSelectedMeal(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setSelectedMeal(null)}
              >
                &times;
              </button>
              <h2>{selectedMeal.name}</h2>
              <p className="modal-calories">{selectedMeal.calories} Calories</p>

              <div className="ingredients-section">
                <h3>Ingredients:</h3>
                <ul>
                  {selectedMeal.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="video-section">
                <h3>Video Tutorial:</h3>
                <div className="video-responsive">
                  <iframe
                    width="560"
                    height="315"
                    src={selectedMeal.videoUrl}
                    title={`${selectedMeal.name} Tutorial`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Calorie Tracker */}
        <section className="tracker-section">
          <h2 className="section-title">Calorie Tracker</h2>

          {/* Form */}
          <form className="tracker-form" onSubmit={handleAddMeal}>
            <div className="input-group">
              <label htmlFor="foodName">Food Name</label>
              <input
                id="foodName"
                type="text"
                placeholder="e.g. Avocado Toast"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="calories">Calories</label>
              <input
                id="calories"
                type="number"
                placeholder="e.g. 300"
                value={caloriesInput}
                onChange={(e) => setCaloriesInput(e.target.value)}
                min="0"
                required
              />
            </div>
            <button type="submit" className="add-btn">
              Add Food
            </button>
          </form>

          {/* Table */}
          <div className="tracker-table-container">
            <table className="tracker-table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Calories</th>
                </tr>
              </thead>
              <tbody>
                {loggedMeals.length > 0 ? (
                  loggedMeals.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.calories} kcal</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: "center" }}>
                      No meals logged yet today.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total Calories</strong></td>
                  <td><strong>{totalCalories} kcal</strong></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>

      <LoggedFooter />
    </>
  );
}