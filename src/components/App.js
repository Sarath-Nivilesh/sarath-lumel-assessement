import React, { useState } from "react";
import RowComponent from "./RowComponent";
import initialData from "../utils/InitialData.json";

export default function App() {
  const [data, setData] = useState(initialData);

 
  const updateValue = (id, newValue, type) => {
    const newData = structuredClone(data);
    const updateTree = (node) => {
      if (node.id === id) {
        if (type === "value") {
          node.value = newValue;
        } else if (type === "distributetochild") {
          distributeValue(node, newValue);
        }
      }
      if (node.children) {
        node.children.forEach(updateTree);
        node.value = node.children.reduce((sum, c) => sum + c.value, 0);
      }
    };

    newData.rows.forEach(updateTree);
    setData(newData);
  };

const distributeValue = (node, newValue) => {
  const leaves = [];
  const getLeaves = (n) => {
    if (!n.children) leaves.push(n);
    else n.children.forEach(getLeaves);
  };
  getLeaves(node);

  const originalTotal = leaves.reduce((sum, l) => sum + l.value, 0);

  leaves.forEach((leaf) => {
    const weight = leaf.value / originalTotal;
    leaf.value = Math.round(newValue * weight * 100) / 100; 
  });
};

  const FinalTotal = data.rows.reduce((sum, elem) => sum + elem.value, 0);

  return (
    <div>
      <h2>Sarath-Hierarchical Table Assessement</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <RowComponent
              key={row.id}
              node={row}
              originalNode={initialData.rows.find((r) => r.id === row.id)}
              updateValue={updateValue}
              level={0}
            />
          ))}
          <tr>
            <td>Final Total</td>
            <td >{FinalTotal}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
