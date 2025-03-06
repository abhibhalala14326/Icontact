import React, { useEffect, useState } from "react";
import Layout from "./page/Layout";
import axios from "axios";

function App() {
  const [userData, setUserData] = useState(null);

  

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
