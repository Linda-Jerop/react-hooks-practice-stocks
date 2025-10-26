import React, { useState, useEffect } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then(response => response.json())
      .then(data => setStocks(data));
  }, []);

  const buyStock = (stock) => {
    setPortfolio(prevPortfolio => [...prevPortfolio, stock]);
  };

  const sellStock = (stockToSell) => {
    setPortfolio(prevPortfolio => 
      prevPortfolio.filter((stock, index) => {
        // Remove only the first occurrence of the stock
        const firstIndex = prevPortfolio.findIndex(s => s.id === stockToSell.id);
        return index !== firstIndex;
      })
    );
  };

  const getFilteredAndSortedStocks = () => {
    let filteredStocks = stocks;
    
    // Filter by type
    if (filterBy !== "All") {
      filteredStocks = stocks.filter(stock => stock.type === filterBy);
    }
    
    // Sort stocks
    const sortedStocks = [...filteredStocks].sort((a, b) => {
      if (sortBy === "Alphabetically") {
        return a.ticker.localeCompare(b.ticker);
      } else if (sortBy === "Price") {
        return a.price - b.price;
      }
      return 0;
    });
    
    return sortedStocks;
  };

  return (
    <div>
      <SearchBar 
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer 
            stocks={getFilteredAndSortedStocks()} 
            onStockClick={buyStock}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer 
            portfolio={portfolio}
            onStockClick={sellStock}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
