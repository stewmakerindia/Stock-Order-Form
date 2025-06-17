import { useState } from 'react';

const itemData = [
  { type: "header", label: "Meat & Eggs" },
  { type: "item", name: "Chicken", unit: "Kg", qty: 0 },
  { type: "item", name: "Mutton", unit: "Kg", qty: 0 },
  { type: "item", name: "Eggs", unit: "Tray", qty: 0 },
  { type: "header", label: "Sea Food" },
  { type: "item", name: "Prawns", unit: "Kg", qty: 0 }
];

function App() {
  const [items, setItems] = useState(itemData);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [mode, setMode] = useState("Stock Order");

  const updateQty = (index, delta) => {
    setItems(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(0, updated[index].qty + delta);
      return updated;
    });
  };

  const createWhatsAppMessage = () => {
    const list = items
      .filter(i => i.type === 'item' && i.qty > 0)
      .map(i => `${i.name}: ${i.qty} ${i.unit}`)
      .join("\n");
    const heading = mode === "Stock Status" ? "🧺 Stock Status Report" : "🛒 Stock Order Form";
    const text = encodeURIComponent(`${heading} (${date}):\n${list}`);
    return `https://wa.me/?text=${text}`;
  };

  return (
    <>
      <div className="header">
        <h2>Stock Order Form</h2>
      </div>
      <div className="container">
        <div className="logo-container">
          <img src="logo.jpg" alt="StewMaker Logo" />
        </div>
        <label><strong>Date:</strong>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <br/><br/>
        <label><strong>Mode:</strong>
          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="Stock Order">Stock Order</option>
            <option value="Stock Status">Stock Status</option>
          </select>
        </label>
        <div>
        {items.map((item, idx) => (
          item.type === "header" ? (
            <h3 key={idx} className="category-header">{item.label}</h3>
          ) : (
            <div key={idx} className="item-row">
              <span>{item.name} ({item.unit})</span>
              <div>
                <button className="btn btn-minus" onClick={() => updateQty(idx, -1)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.qty}</span>
                <button className="btn btn-plus" onClick={() => updateQty(idx, 1)}>+</button>
              </div>
            </div>
          )
        ))}
        </div>
        <a href={createWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
          <button className="send-btn">Send on WhatsApp</button>
        </a>
      </div>
    </>
  );
}

export default App;