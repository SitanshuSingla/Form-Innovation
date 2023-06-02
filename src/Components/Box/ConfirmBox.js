import React from "react";

const ConfirmBox = ({ showConfirmation, setShowConfirmation }) => {
  const handleConfirm = () => {
    const confirm = window.confirm("Form submitted");
    if (confirm) {
      setShowConfirmation(false);
    }
  };

  return <div>{showConfirmation && handleConfirm()}</div>;
};

export default ConfirmBox;
