import React, { useState, useEffect } from 'react';
import BillGraph from './BillGraph';

const BillSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);    // now: array of {bill_id, bill_title}
  const [selectedBillId, setSelectedBillId] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    fetch(`http://34.205.59.36/api/bills/search?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(data => setSuggestions(data))
      .catch(console.error);
  }, [query]);


  const handleSelect = (bill_id) => {
    setSelectedBillId(bill_id);
    setQuery('');            // clear input if you like
    setSuggestions([]);      
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by ID or title…"
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setSelectedBillId(null);
        }}
        style={{ width: '100%', padding: 8, fontSize: 16 }}
      />

      {suggestions.length > 0 && (
        <ul style={{
          listStyle: 'none', margin: 0, padding: 0,
          border: '1px solid #ccc', maxHeight: 200, overflowY: 'auto'
        }}>
          {suggestions.map(s => (
            <li 
              key={s.bill_id}
              onClick={() => handleSelect(s.bill_id)}
              style={{
                padding: 8, cursor: 'pointer', borderBottom: '1px solid #eee'
              }}
            >
              <strong>{s.bill_id}</strong> — {s.bill_title}
            </li>
          ))}
        </ul>
      )}

      {selectedBillId && (
        <div style={{ marginTop: 16 }}>
          <BillGraph billId={selectedBillId} />
        </div>
      )}
    </div>
  );
};

export default BillSearch;
