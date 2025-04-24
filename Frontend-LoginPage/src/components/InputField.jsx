import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const InputField = ({ type, placeholder, icon ,value, onChange}) => {
  const getIcon = () => {
    if (icon === "mail") return faEnvelope;
    if (icon === "lock") return faLock;
    return null;
  };

  return (
    <div className="input-field">
      <FontAwesomeIcon icon={getIcon()} className="input-icon" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
