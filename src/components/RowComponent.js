import React, { useState } from "react";

export default function RowComponent({
  node,
  originalNode,
  updateValue,
  level
}) {
  const [input, setInput] = useState("");

  


  const handleApplyPercentage = () => {
    // console.log('handleApplyPercentage',input)
  const percent = parseFloat(input);
  if (isNaN(percent)) return;

  const increaseAmount = (node.value * percent) / 100;
  const newValue = node.value + increaseAmount;

  if (node.children) {
    updateValue(node.id, newValue, "distributetochild"); 
  } else {
    updateValue(node.id, newValue, "value");
  }

  setInput("");
};

  const handleApplyVal = () => {
    const val = parseFloat(input);
    if (!isNaN(val)) {
      if (node.children) {
        updateValue(node.id, val, "distributetochild");
      } else {
        updateValue(node.id, val, "value");
      }
      setInput("");
    }
  };

  const getOriginalValue = () => {
    if (!originalNode) return null;
    if (originalNode.children) {
      return originalNode.children.reduce((s, c) => s + c.value, 0);
    }
    return originalNode.value;
  };

const variance =
  ((node.value - getOriginalValue()) / getOriginalValue()) * 100;

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 5}px` }}>{level >0 ? `--` : false}{node.label}</td>
        <td>{node.value}</td>
        <td>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="number"
          />
        </td>
        <td>
          <button onClick={handleApplyPercentage}>Apply %</button>
        </td>
        <td>
          <button onClick={handleApplyVal}>Apply Val</button>
        </td>
        <td>{`${variance.toFixed(2)}%`}</td>
      </tr>
      {node.children &&
        node.children.map((child) => (
          <RowComponent
            key={child.id}
            node={child}
            originalNode={
              originalNode?.children?.find((c) => c.id === child.id)
            }
            updateValue={updateValue}
            level={level + 1}
          />
        ))}
    </>
  );
}
