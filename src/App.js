import { useState } from "react";

const locations = ["Yelahanka", "Thanisandra", "Kammanahalli", "Indiranagar"];
const modes = ["Stock Order", "Stock Status", "Dish Count"];

const stockItems = [
  { type: "header", label: "Meat & Eggs" },
  { type: "item", name: "Chicken", unit: "Kg", qty: 0 },
  { type: "item", name: "Mutton", unit: "Kg", qty: 0 },
  { type: "item", name: "Eggs", unit: "Tray", qty: 0 },
  { type: "header", label: "Rice" },
  { type: "item", name: "Appam Rice", unit: "Bori", qty: 0 },
  { type: "item", name: "Ghee Rice", unit: "Bori", qty: 0 }
];

const dishItems = [
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

export default function App() {
  const [mode, setMode] = useState("Stock Order");
  const [location, setLocation] = useState("Yelahanka");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [stock, setStock] = useState(stockItems);
  const [dishes, setDishes] = useState(dishItems);

  const updateQty = (index, delta, data, setter) => {
    setter(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(0, updated[index].qty + delta);
      return updated;
    });
  };

  const getWhatsAppMessage = () => {
    const data = mode === "Dish Count" ? dishes : stock;
    const lines = data
      .filter(i => (i.type === "dish" || i.type === "item") && i.qty > 0)
      .map(i => `${i.name}: ${i.qty}${i.unit ? " " + i.unit : ""}`);
    const heading = `${mode} - ${location}`;
    const message = `${heading} (${date}):\n` + lines.join("\n");
    return "https://wa.me/?text=" + encodeURIComponent(message);
  };

  const renderList = (data, isDish) =>
    data.map((item, idx) =>
      item.type === "header" ? (
        <h3 key={idx} className="category-header">{item.label}</h3>
      ) : (
        <div key={idx} className="item-row">
          <span>{item.name}{item.unit ? ` (${item.unit})` : ""}</span>
          <div>
            <button className="btn btn-minus" onClick={() => updateQty(idx, -1, data, isDish ? setDishes : setStock)}>-</button>
            <span style={{ margin: "0 10px" }}>{item.qty}</span>
            <button className="btn btn-plus" onClick={() => updateQty(idx, 1, data, isDish ? setDishes : setStock)}>+</button>
          </div>
        </div>
      )
    );

  return (
    <>
      <div className="header">
        <h2>Stew Maker Order Form</h2>
        <div className="controls">
          <label>Date:
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </label>
          <label>Mode:
            <select value={mode} onChange={e => setMode(e.target.value)}>
              {modes.map(m => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label>Location:
            <select value={location} onChange={e => setLocation(e.target.value)}>
              {locations.map(l => <option key={l}>{l}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="container">
        {mode === "Dish Count" ? renderList(dishes, true) : renderList(stock, false)}
        <a href={getWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
          <button className="send-btn">Send on WhatsApp</button>
        </a>
      </div>
    </>
  );
}