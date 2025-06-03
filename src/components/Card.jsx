import React from "react";

const Card = ({title, content}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-blue-500 mb-2">{title}</h3>
      <p className="text-gray-600">
        {`${content}`}
      </p>
    </div>
  );
};

export default Card;
