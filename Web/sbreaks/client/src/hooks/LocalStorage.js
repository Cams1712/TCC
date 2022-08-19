import React from "react";

const LocalStorage = ({ key, value }) => {
  localStorage.setItem(key, value);

  return <></>;
};

export default LocalStorage;
