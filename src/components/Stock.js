import React from "react";

function Stock({ stock, onClick }) {
  const handleClick = () => {
    if (onClick && stock) {
      onClick(stock);
    }
  };

  return (
    <div>
      <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className="card-body">
          <h5 className="card-title">{stock?.name || "Company Name"}</h5>
          <p className="card-text">
            {stock?.ticker}: ${stock?.price || "Stock Price"}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
