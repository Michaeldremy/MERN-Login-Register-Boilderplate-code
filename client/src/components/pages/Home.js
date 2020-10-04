import React from "react";

import useHidePageInformation from '../../hooks/useHidePageInformation';

export default function Home() {

  useHidePageInformation(); // Custom hook

  return (
    <div className="page">
      <h1>hi</h1>
    </div>
  );
}
