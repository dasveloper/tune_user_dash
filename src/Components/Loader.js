import React from "react";
export const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner" />
      <p className="loader__text">Loading data...</p>
    </div>
  );
};
