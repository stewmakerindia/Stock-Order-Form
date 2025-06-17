import { useState } from 'react';

const defaultItems = [
  { name: "Chicken", unit: "Kg", qty: 0 },
  { name: "Mutton", unit: "Kg", qty: 0 },
  { name: "Eggs", unit: "Tray", qty: 0 },
  { name: "Prawns", unit: "Kg", qty: 0 },
  { name: "Coconut", unit: "Kg", qty: 0 },
  { name: "Potato", unit: "Kg", qty: 0 },
  { name: "Beans", unit: "Kg", qty: 0 },
  { name: "Onion", unit: "Kg", qty: 0 },
  { name: "Small Onion", unit: "Kg", qty: 0 },
  { name: "Carrot", unit: "Kg", qty: 0 },
  { name: "Ginger", unit: "Kg", qty: 0 },
  { name: "Raw Mango", unit: "Kg", qty: 0 },
  { name: "Peeled Garlic", unit: "Packet", qty: 0 },
  { name: "Mushroom", unit: "Packet", qty: 0 },
  { name: "Bread", unit: "Packet", qty: 0 },
  { name: "Bread Powder", unit: "Packet", qty: 0 },
  { name: "Instant Dry Yeast", unit: "Packet", qty: 0 },
  { name: "Chips", unit: "Packet", qty: 0 },
  { name: "Maida", unit: "Kg", qty: 0 },
  { name: "Pickles", unit: "Bottle", qty: 0 },
  { name: "Coconut Powder", unit: "Packet", qty: 0 },
  { name: "Magic Masala", unit: "Packet", qty: 0 },
  { name: "Soya Granules", unit: "Packet", qty: 0 },
  { name: "Garam Masala", unit: "Packet", qty: 0 },
  { name: "Chilli Powder", unit: "Packet", qty: 0 },
  { name: "Turmeric Powder", unit: "Packet", qty: 0 },
  { name: "Salt", unit: "Kg", qty: 0 },
  { name: "Sugar", unit: "Kg", qty: 0 },
  { name: "Vinegar", unit: "Bottle", qty: 0 },
  { name: "Cloves", unit: "Packet", qty: 0 },
  { name: "Cardamom", unit: "Packet", qty: 0 },
  { name: "Black Pepper", unit: "Packet", qty: 0 },
  { name: "Cinnamon", unit: "Packet", qty: 0 },
  { name: "Dry Chilli", unit: "Packet", qty: 0 },
  { name: "Dry Chilli Round", unit: "Packet", qty: 0 },
  { name: "Whole Coriander", unit: "Packet", qty: 0 },
  { name: "Fennel", unit: "Packet", qty: 0 },
  { name: "Raisins", unit: "Packet", qty: 0 },
  { name: "Cashew", unit: "Packet", qty: 0 },
  { name: "Sunflower Oil", unit: "Ltr", qty: 0 },
  { name: "Coconut Oil", unit: "Ltr", qty: 0 },
  { name: "Ghee", unit: "Ltr", qty: 0 },
  { name: "Appam Rice", unit: "Bori", qty: 0 },
  { name: "Ghee Rice", unit: "Bori", qty: 0 },
  { name: "Chicken Cutlets", unit: "Packet", qty: 0 },
  { name: "Veg Cutlets", unit: "Packet", qty: 0 },
  { name: "Roast Masala", unit: "Packet", qty: 0 },
  { name: "Barrista", unit: "Packet", qty: 0 },
  { name: "Banana Leaf", unit: "Pcs", qty: 0 },
  { name: "Appam Box", unit: "Box", qty: 0 },
  { name: "SM Bag", unit: "Box", qty: 0 },
  { name: "SM Bag (w/o handle)", unit: "Box", qty: 0 },
  { name: "Railway Meal Cover", unit: "Box", qty: 0 },
  { name: "Cutlet Box", unit: "Box", qty: 0 },
  { name: "500ml container", unit: "Box", qty: 0 },
  { name: "500g container", unit: "Box", qty: 0 },
  { name: "Chutney Box", unit: "Box", qty: 0 },
  { name: "Silver Pouch - 9X12", unit: "Box", qty: 0 },
  { name: "Silver Pouch - 6X9", unit: "Box", qty: 0 },
  { name: "Staeppler Pins", unit: "Box", qty: 0 },
  { name: "Tape", unit: "Pcs", qty: 0 },
  { name: "Garbage Bag - 24 X 32", unit: "Box", qty: 0 }
];

function App() {
  const [items, setItems] = useState(defaultItems);
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
    const list = items.filter(i => i.qty > 0).map(i => `{i.name}: {i.qty} {i.unit}`).join("\n");
    const heading = mode === "Stock Status" ? "🧺 Stock Status Report" : "🛒 Stock Order Form";
    const text = encodeURIComponent(`{heading} ({date}):\n{list}`);
    return `https://wa.me/?text={text}`;
  };

  return (
    <>
      <div className="header">
        <h2>Stock Order Form</h2>
        <img src="logo.jpg" alt="StewMaker Logo" style={ height: '40px' } />
      </div>
      <div className="container">
        <label><strong>Date:</strong>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} style={ marginLeft: 10, padding: 5, borderColor: '#1A2650', borderRadius: 4 } />
        </label>
        <br/><br/>
        <label><strong>Mode:</strong>
          <select value={mode} onChange={e => setMode(e.target.value)} style={ marginLeft: 10, padding: 5, borderColor: '#1A2650', borderRadius: 4 }>
            <option value="Stock Order">Stock Order</option>
            <option value="Stock Status">Stock Status</option>
          </select>
        </label>
        {items.map((item, idx) => (
          <div key={item.name} className="item-row">
            <span>{item.name} ({item.unit})</span>
            <div>
              <button className="btn btn-minus" onClick={() => updateQty(idx, -1)}>-</button>
              <span style={ margin: '0 10px' }>{item.qty}</span>
              <button className="btn btn-plus" onClick={() => updateQty(idx, 1)}>+</button>
            </div>
          </div>
        ))}
        <a href={createWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
          <button className="send-btn">Send on WhatsApp</button>
        </a>
      </div>
    </>
  );
}

export default App;