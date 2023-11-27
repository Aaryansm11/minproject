
import React from 'react';
import './dash.css';
import Graph from './graph.jsx';

const Dash = ({ data }) => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-block">
        <h3>Total Items</h3>
        <p className="data">{data.totalItems}</p>
      </div>
      <div className="dashboard-block">
        <h3>Total Value</h3>
        <p className="data">{data.totalValue}</p>
      </div>
      <div className="dashboard-block">
        <h3>Out of Stock</h3>
        <p className="data">{data.outOfStock}</p>
      </div>
      <div className="dashboard-block">
        <h3>Categories</h3>
        <p className="data">{data.categories}</p>
      </div>
      <div className="dashboard-block">
        <h3>Items Graph</h3>
        <Graph d={data} />
      </div>
    </div>
  );
};

export default Dash;
