import React from "react";
import Warning from "../../assets/images/png/warning.png";
import "./emptyList.scss";

const EmptyList = () => {
  return (
    <div className="empty-list">
      <img src={Warning} alt="" />
      <h4>No Tasks Found</h4>
    </div>
  );
};

export default EmptyList;
