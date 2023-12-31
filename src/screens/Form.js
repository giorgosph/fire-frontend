import React from "react";

import useFrom from "../hooks/useFrom";

const Form = () => {
  const { loading, formFields, addRow, inputChange, removeRow, handleSubmit, toggleOriginal} = useFrom();

  return (
    <div className="container">
      <h3>Enter the corresponding to calculate the percentage</h3>
      {formFields.map((field, index) => (
        <div key={field.id}>
          <input
            className="formInput formInputTitle"
            type="text"
            placeholder="Title"
            name="title"
            value={field.title}
            onChange={(e) => inputChange(index, e)}
          />
          <input
            className="formInput"
            type="number"
            placeholder="Height (m)"
            name="height"
            value={field.height}
            onChange={(e) => inputChange(index, e)}
          />
          <input
            className="formInput"
            type="number"
            placeholder="Width (m)"
            name="width"
            value={field.width}
            onChange={(e) => inputChange(index, e)}
          />
          <input
            className="formInput"
            type="number"
            placeholder="Distance (m)"
            name="distance"
            value={field.distance}
            onChange={(e) => inputChange(index, e)}
          />
          <button className="formButton" onClick={() => toggleOriginal(index)} disabled={loading}>
            { field.original ? 'Regular' : '( )' }
          </button>
          {index > 0 && (
            <button className="formButton" onClick={() => removeRow(field.id)} disabled={loading}>-</button>
          )}
        </div>
      ))}
      <button className="formButton" onClick={addRow} disabled={loading}>+</button>
      <button className="formButton" onClick={handleSubmit} disabled={loading}>Submit</button>
    </div>
  );
};

export default Form;
