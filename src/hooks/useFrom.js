import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../context/store";
import useAxios from "./useAxios";
import { CALCULATION_EP } from "../utils/url";

const useFrom = () => {
  const [formFields, setFormFields] = useState([
    { id: 1, title: '', height: '', width: '', distance: '', original: true },
  ]);

  const authCtx = useContext(AuthContext);
  const { data, error, loading, fetchAPI } = useAxios();

  const inputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index][name] = value;
    setFormFields(updatedFields);
  };

  const addRow = () => {
    const newId = formFields[formFields.length - 1].id + 1;
    setFormFields([
      ...formFields,
      { id: newId, title: '', height: '', width: '', distance: '', original: true },
    ]);
  };

  const removeRow = (id) => {
    const updatedFields = formFields.filter((field) => field.id !== id);
    setFormFields(updatedFields);
  };

  const toggleOriginal = (index) => {
    const updatedFields = [...formFields];
    updatedFields[index].original = !updatedFields[index].original;
    setFormFields(updatedFields);
  };

  const handleSubmit = () => {
    const config = { Authorization: authCtx.token }; 

    fetchAPI('post', CALCULATION_EP, formFields, config);
  };

  useEffect(() => {
    if(!loading && data) {
      setFormFields([{ id: 1, title: '', height: '', width: '', distance: '', original: true }])
      alert(`Result has been calculated:\n ${JSON.stringify(data.body)}`);
    }
    else if(!loading && error) alert(`Something went wrong\n Kindly contact your administrator`);
  }, [data, error, loading])


  return {
    loading, formFields, handleSubmit, 
    addRow, removeRow, inputChange, toggleOriginal, 
  }
}

export default useFrom;