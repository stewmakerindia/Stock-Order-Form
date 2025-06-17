import { useState } from 'react';

const itemData = [
  { type: "header", label: "Meat & Eggs" },
  { type: "item", name: "Chicken", unit: "Kg", qty: 0 },
  { type: "item", name: "Mutton", unit: "Kg", qty: 0 },
  { type: "item", name: "Eggs", unit: "Tray", qty: 0 },
  { type: "header", label: "Sea Food" },
  { type: "item", name: "Prawns", unit: "Kg", qty: 0 },
  { type: "header", label: "Vegetables" },
  { type: "item", name: "Coconut", unit: "Kg", qty: 0 },
  { type: "item", name: "Potato", unit: "Kg", qty: 0 },
  { type: "item", name: "Beans", unit: "Kg", qty: 0 },
  { type: "item", name: "Onion", unit: "Kg", qty: 0 },
  { type: "item", name: "Small Onion", unit: "Kg", qty: 0 },
  { type: "item", name: "Carrot", unit: "Kg", qty: 0 },
  { type: "item", name: "Ginger", unit: "Kg", qty: 0 },
  { type: "item", name: "Raw Mango", unit: "Kg", qty: 0 },
  { type: "item", name: "Peeled Garlic", unit: "Packet", qty: 0 },
  { type: "item", name: "Mushroom", unit: "Packet", qty: 0 },
  { type: "header", label: "Packaged Foods" },
  { type: "item", name: "Bread", unit: "Packet", qty: 0 },
  { type: "item", name: "Bread Powder", unit: "Packet", qty: 0 },
  { type: "item", name: "Instant Dry Yeast", unit: "Packet", qty: 0 },
  { type: "item", name: "Chips", unit: "Packet", qty: 0 },
  { type: "item", name: "Maida", unit: "Kg", qty: 0 },
  { type: "item", name: "Pickles", unit: "Bottle", qty: 0 },
  { type: "item", name: "Coconut Powder", unit: "Packet", qty: 0 },
  { type: "item", name: "Magic Masala", unit: "Packet", qty: 0 },
  { type: "item", name: "Soya Granules", unit: "Packet", qty: 0 },
  { type: "header", label: "Spices & Condiments" },
  { type: "item", name: "Garam Masala", unit: "Packet", qty: 0 },
  { type: "item", name: "Chilli Powder", unit: "Packet", qty: 0 },
  { type: "item", name: "Turmeric Powder", unit: "Packet", qty: 0 },
  { type: "item", name: "Salt", unit: "Kg", qty: 0 },
  { type: "item", name: "Sugar", unit: "Kg", qty: 0 },
  { type: "item", name: "Vinegar", unit: "Bottle", qty: 0 },
  { type: "item", name: "Cloves", unit: "Packet", qty: 0 },
  { type: "item", name: "Cardamom", unit: "Packet", qty: 0 },
  { type: "item", name: "Black Pepper", unit: "Packet", qty: 0 },
  { type: "item", name: "Cinnamon", unit: "Packet", qty: 0 },
  { type: "item", name: "Dry Chilli", unit: "Packet", qty: 0 },
  { type: "item", name: "Dry Chilli Round", unit: "Packet", qty: 0 },
  { type: "item", name: "Whole Coriander", unit: "Packet", qty: 0 },
  { type: "item", name: "Fennel", unit: "Packet", qty: 0 },
  { type: "header", label: "Dry Fruits & Nuts" },
  { type: "item", name: "Raisins", unit: "Packet", qty: 0 },
  { type: "item", name: "Cashew", unit: "Packet", qty: 0 },
  { type: "header", label: "Oils & Fat" },
  { type: "item", name: "Sunflower Oil", unit: "Ltr", qty: 0 },
  { type: "item", name: "Coconut Oil", unit: "Ltr", qty: 0 },
  { type: "item", name: "Ghee", unit: "Ltr", qty: 0 },
  { type: "header", label: "Rice" },
  { type: "item", name: "Appam Rice", unit: "Bori", qty: 0 },
  { type: "item", name: "Ghee Rice", unit: "Bori", qty: 0 },
  { type: "header", label: "Finished Goods" },
  { type: "item", name: "Chicken Cutlets", unit: "Packet", qty: 0 },
  { type: "item", name: "Veg Cutlets", unit: "Packet", qty: 0 },
  { type: "item", name: "Roast Masala", unit: "Packet", qty: 0 },
  { type: "item", name: "Barrista", unit: "Packet", qty: 0 },
  { type: "header", label: "Packing Materials" },
  { type: "item", name: "Banana Leaf", unit: "Pcs", qty: 0 },
  { type: "item", name: "Appam Box", unit: "Box", qty: 0 },
  { type: "item", name: "SM Bag", unit: "Box", qty: 0 },
  { type: "item", name: "SM Bag (w/o handle)", unit: "Box", qty: 0 },
  { type: "item", name: "Railway Meal Cover", unit: "Box", qty: 0 },
  { type: "item", name: "Cutlet Box", unit: "Box", qty: 0 },
  { type: "item", name: "500ml container", unit: "Box", qty: 0 },
  { type: "item", name: "500g container", unit: "Box", qty: 0 },
  { type: "item", name: "Chutney Box", unit: "Box", qty: 0 },
  { type: "item", name: "Silver Pouch - 9X12", unit: "Box", qty: 0 },
  { type: "item", name: "Silver Pouch - 6X9", unit: "Box", qty: 0 },
  { type: "item", name: "Staeppler Pins", unit: "Box", qty: 0 },
  { type: "item", name: "Tape", unit: "Pcs", qty: 0 },
  { type: "header", label: "Garbage Bag" },
  { type: "item", name: "Garbage Bag - 24 X 32", unit: "Box", qty: 0 }
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
        <div className="controls">
          <label><strong>Date:</strong>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          </label>
          <label><strong>Mode:</strong>
            <select value={mode} onChange={e => setMode(e.target.value)}>
              <option value="Stock Order">Stock Order</option>
              <option value="Stock Status">Stock Status</option>
            </select>
          </label>
        </div>
        <img className="logo" src="logo.jpg" alt="StewMaker Logo" />
      </div>

      <div className="container">
        {items.map((item, idx) => (
          item.type === "header" ? (
            <h3 key={idx} className="category-header">{item.label}</h3>
          ) : (
            <div key={idx} className="item-row">
              <span>{item.name} ({item.unit})</span>
              <div>
                <button className="btn btn-minus" onClick={() => updateQty(idx, -1)}>-</button>
                <span style={ margin: '0 10px' }>{item.qty}</span>
                <button className="btn btn-plus" onClick={() => updateQty(idx, 1)}>+</button>
              </div>
            </div>
          )
        ))}

        <a href={createWhatsAppMessage()} target="_blank" rel="noopener noreferrer">
          <button className="send-btn">Send on WhatsApp</button>
        </a>
      </div>
    </>
  );
}

export default App;