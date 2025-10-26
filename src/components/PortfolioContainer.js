import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ portfolio, onStockClick }) {
  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolio.map((stock, index) => (
        <Stock 
          key={`${stock.id}-${index}`} 
          stock={stock} 
          onClick={onStockClick}
        />
      ))}
    </div>
  );
}

export default PortfolioContainer;
