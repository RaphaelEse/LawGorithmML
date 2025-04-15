import React, { useState, useEffect } from 'react';
import BillGraph from './BillGraph'; // Make sure BillGraph is exported from its file

const BillSearch = () => {
  const [query, setQuery] = useState('');
  const [billSuggestions, setBillSuggestions] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    if (query.trim() === '') {
      setBillSuggestions([]);
      return;
    }
    fetch(`http://127.0.0.1:5000/bills/search?q=${encodeURIComponent(query)}`)
      .then((response) => response.json())
      .then((data) => setBillSuggestions(data))
      .catch((error) => {
        console.error('Error fetching autocomplete suggestions:', error);
      });
  }, [query]);

  const handleSuggestionClick = (billId) => {
    // Set the query to the selected bill id
    setQuery(billId);
    // Clear suggestions from the view
    setBillSuggestions([]);
    // Set the selected bill for further graph visualization
    setSelectedBill(billId);
  };

  return (
    <div >
      <input
        type="text"
        placeholder="Search bills..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // Clear the selected bill when typing a new query.
          setSelectedBill(null);
        }}
        style={{ width: '100%', padding: '8px', fontSize: '16px' }}
      />
      {billSuggestions.length > 0 && (
        <ul style={{ listStyle: 'none', paddingLeft: 0, border: '1px solid #ccc' }}>
          {billSuggestions.slice(0, 10).map((billId) => (
            <li
              key={billId}
              style={{
                padding: '8px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer'
              }}
              onClick={() => handleSuggestionClick(billId)}
            >
              {billId}
            </li>
          ))}
        </ul>
      )}
      {selectedBill && (
        <div style={{ marginTop: '16px' }}>
          <BillGraph billId={selectedBill} />
        </div>
      )}
    </div>
  );
};

export default BillSearch;
