import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";

function App() {


    fetch("http://127.0.0.1:9977/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })


  return (
    <div>
      <UserForm/>
    </div>
  );
}

export default App;
