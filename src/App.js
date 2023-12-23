import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formFields, setFormFields] = useState([
    { id: 1, title: '', height: '', width: '', distance: '', originalValues: true },
  ]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index][name] = value;
    setFormFields(updatedFields);
  };

  const handleAddRow = () => {
    const newId = formFields[formFields.length - 1].id + 1;
    setFormFields([
      ...formFields,
      { id: newId, title: '', height: '', width: '', distance: '', originalValues: true },
    ]);
  };

  const handleRemoveRow = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const handleUpdateOriginal = (index) => {
    const updatedFields = [...formFields];
    updatedFields[index].originalValues = false;
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formFields);
    // You can send the formFields data to your backend or perform any necessary actions
  };

  return (
    <div className="container">
      {formFields.map((field, index) => (
        <div key={field.id}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={field.title}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            placeholder="Height"
            name="height"
            value={field.height}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            placeholder="Width"
            name="width"
            value={field.width}
            onChange={(e) => handleInputChange(index, e)}
          />
          <input
            type="text"
            placeholder="Distance"
            name="distance"
            value={field.distance}
            onChange={(e) => handleInputChange(index, e)}
          />
          {index > 0 && (
            <button onClick={() => handleRemoveRow(field.id)}>Remove</button>
          )}
          <button onClick={() => handleUpdateOriginal(index)}>Update Original</button>
        </div>
      ))}
      <button onClick={handleAddRow}>+</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
