import { useState } from "react";

const locations = ["Yelahanka", "Thanisandra", "Kammanahalli", "Indiranagar"];
const modes = ["Stock Order", "Stock Status", "Dish Count"];

const dishData = [
  { type: "header", label: "Stewmaker's Original Stew & Appam Combo" },
  { type: "dish", name: "Chicken Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Mutton Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Veg Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Mushroom Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Egg Stew with 2 Appams", qty: 0 },

  { type: "header", label: "Stewmaker's Curry Stew & Appam Combos" },
  { type: "dish", name: "Egg Curry Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Veg Curry Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Mushroom Curry Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Chicken Curry Stew with 2 Appams", qty: 0 },
  { type: "dish", name: "Mutton Curry Stew with 2 Appams", qty: 0 },

  { type: "header", label: "Stewmaker's Fusion Stew & Appam Combo" },
  { type: "dish", name: "Paneer Kofta Stew with 2 Appam", qty: 0 },
  { type: "dish", name: "Chicken Kofta Stew with 2 Appam", qty: 0 },
  { type: "dish", name: "Mutton Kofta Stew with 2 Appams", qty: 0 },

  { type: "header", label: "Stewmaker's Stew Feast Combo" },
  { type: "dish", name: "Stewmaker’s Easter Feast Combo - Veg", qty: 0 },
  { type: "dish", name: "Stewmaker’s Easter Feast Combo - Chicken", qty: 0 },
  { type: "dish", name: "Stewmaker’s Easter Feast Combo - Mutton", qty: 0 },

  { type: "header", label: "Lunch & Dinner Menu" },
  { type: "dish", name: "Kerala Railway Prawns Meal", qty: 0 },
  { type: "dish", name: "Kerala Railway Chicken Meal", qty: 0 },
  { type: "dish", name: "Chicken Stew Thali", qty: 0 },
  { type: "dish", name: "Mutton Stew Thali", qty: 0 },
  { type: "dish", name: "Egg Stew Thali", qty: 0 },
  { type: "dish", name: "Veg Stew Thali", qty: 0 },

  { type: "header", label: "Chefs Special Signature Dishes" },
  { type: "dish", name: "Mamma's Chicken Cutlet [2 Pieces] with Chef's Special Sauce", qty: 0 },
  { type: "dish", name: "Mamma's Veg Cutlet [2 Pieces] with Chef's Special Sauce", qty: 0 },
  { type: "dish", name: "Kerala Homestyle Prawns Roast", qty: 0 },
  { type: "dish", name: "Kerala Homestyle Chicken Roast", qty: 0 },
  { type: "dish", name: "Kottayam Granny's Egg Roast", qty: 0 },

  { type: "header", label: "Appams" },
  { type: "dish", name: "Lace Appam", qty: 0 },
  { type: "dish", name: "Flat Appam", qty: 0 },
  { type: "dish", name: "Noodle Appam", qty: 0 },
  { type: "dish", name: "Mini Appam", qty: 0 },

  { type: "header", label: "Rice" },
  { type: "dish", name: "Ghee Rice", qty: 0 }
];

function App() {
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [mode, setMode] = useState("Stock Order");
  const [location, setLocation] = useState("Yelahanka");
  const [dishes, setDishes] = useState(dishData);

  const updateQty = (index, delta) => {
    setDishes(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(0, updated[index].qty + delta);
      return updated;
    });
  };

  const createWhatsAppMessage = () => {
    const list = dishes
      .filter(i => i.type === "dish" && i.qty > 0)
      .map(i => `${i.name}: ${i.qty}`)
      .join("\n");
    const heading = `Dish Count - ${location}`;
    const text = encodeURIComponent(`${heading} (${date}):\n${list}`);
    return `https://wa.me/?text=${text}`;
  };

  return (
    <>
      <div className="header">
        <h2>Stew Maker Order Form</h2>
        <div className="controls">
          <label>
            <strong>Date:</strong>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </label>
          <label>
            <strong>Mode:</strong>
            <select value={mode} onChange={e => setMode(e.target.value)}>
              {modes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
          <label>
            <strong>Location:</strong>
            <select value={location} onChange={e => setLocation(e.target.value)}>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="container">
        {mode === "Dish Count" ? (
          <>
            {dishes.map((item, idx) =>
              item.type === "header" ? (
                <h3 key={idx} className="category-header">{item.label}</h3>
              ) : (
                <div key={idx} className="item-row">
                  <span>{item.name}</span>
                  <div>
                    <button className="btn btn-minus" onClick={() => updateQty(idx, -1)}>-</button>
                    <span style={{ margin: "0 10px" }}>{item.qty}</span>
                    <button className="btn btn-plus" onClick={() => updateQty(idx, 1)}>+</button>
                  </div>
                </div>
              )
            )}
            <a href={createWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
              <button className="send-btn">Send on WhatsApp</button>
            </a>
          </>
        ) : (
          <p style={{ textAlign: "center" }}>This mode is under construction.</p>
        )}
      </div>
    </>
  );
}

export default App;