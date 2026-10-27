import React, { useState } from "react";
import "./Meals.css";
import LoggedHeader from "../../components/LoggedHeader/LogedHeader";
import LoggedFooter from "../../components/LoggedFooter/LoggedFooter";

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
    videoUrl: "https://www.youtube.com/embed/v1VUg6r4yFA?si=My73UeBLITx2718y"
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
    videoUrl: "https://www.youtube.com/embed/v1VUg6r4yFA?si=My73UeBLITx2718y"
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
    videoUrl: "https://www.youtube.com/embed/v1VUg6r4yFA?si=My73UeBLITx2718y"
  }
];

export default function Meals() {
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Initialized to an empty array so no default logged meals show up without input
  const [loggedMeals, setLoggedMeals] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");

  const handleAddMeal = (e) => {
    e.preventDefault();
    
    // Strict validation: returns early if inputs are empty or only contain spaces
    if (!foodName.trim() || !caloriesInput.toString().trim()) return;

    const newMeal = {
      id: Date.now(),
      name: foodName.trim(),
      calories: Number(caloriesInput)
    };

    setLoggedMeals([...loggedMeals, newMeal]);
    setFoodName("");
    setCaloriesInput("");
  };

  // Function to delete a specific logged meal item
  const handleDeleteMeal = (id) => {
    setLoggedMeals(loggedMeals.filter((meal) => meal.id !== id));
  };

  const totalCalories = loggedMeals.reduce((sum, item) => sum + item.calories, 0);

  return (
    <>
      <LoggedHeader />

      <div className="meals-body">
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

        <section className="tracker-section">
          <h2 className="section-title">Calorie Tracker</h2>

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

          <div className="tracker-table-container">
            <table className="tracker-table">
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Calories</th>
                  <th style={{ textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loggedMeals.length > 0 ? (
                  loggedMeals.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.calories} kcal</td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteMeal(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No meals logged yet today.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td><strong>Total Calories</strong></td>
                  <td colSpan="2"><strong>{totalCalories} kcal</strong></td>
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