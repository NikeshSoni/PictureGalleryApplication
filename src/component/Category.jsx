import React, { useState } from "react";
import APiCall from "./APiCall";

function Category() {
  const [categoryData, setCategoryData] = useState("food");

  return (
    <div style={styles.app}>
      <h1>Unsplash Gallery</h1>
      <div style={styles.buttons}>
        <button onClick={() => setCategoryData("food")}>Food</button>
        <button onClick={() => setCategoryData("landscape")}>Landscape</button>
      </div>
      <APiCall category={categoryData} />
    </div>

  );
}

const styles = {
  app: {
    textAlign: "center",
    margin: "20px",
  },
  buttons: {
    marginBottom: "20px",
  },
};

export default Category;
