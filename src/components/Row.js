import React, { useState } from "react";
import { useEffect } from "react";
import { FaTimes, FaPlus, FaMinus } from "react-icons/fa";

function Row({ item, handleDelete, total, setTotal }) {
  const [itemTotal, setItemTotal] = useState(JSON.parse(item.price));
  const [btnValue, setBtnValue] = useState(JSON.parse(item.weight));
  const [updatedItem, setUpdatedItem] = useState({ ...item });
  const { price, weight } = item;
  const pricePerGram = (JSON.parse(item.price) / JSON.parse(item.weight)) * 100;

  const handleUpdate = (price, weight) => {
    item.price = price;
    item.weight = weight;
    // console.log(item);

    fetch(`http://localhost:5000/updateCart/${item._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
        }
      });
  };

  const handlePlus = () => {
    setBtnValue(btnValue + 100);
    setItemTotal(itemTotal + pricePerGram);
    setTotal(total + pricePerGram);
    handleUpdate(
      JSON.stringify(itemTotal + pricePerGram),
      JSON.stringify(btnValue + 100)
    );
  };
  const handleMinus = () => {
    setBtnValue(btnValue - 100);
    setItemTotal(itemTotal - pricePerGram);
    setTotal(total - pricePerGram);
    handleUpdate(
      JSON.stringify(itemTotal - pricePerGram),
      JSON.stringify(btnValue - 100)
    );
  };

  useEffect(() => {
    setBtnValue(JSON.parse(item.weight));
  }, []);

  return (
    <tr>
      <td className="align-middle">
        <img src={item.fishImage} alt="" style={{ width: "50px" }} />
        {item.name}
      </td>
      <td className="align-middle">
        {JSON.parse(price).toFixed(2)}tk/{JSON.parse(item.weight).toFixed(2)}gm
      </td>
      <td className="align-middle">
        <div
          className=" quantity d-flex justify-content-center mx-auto"
          style={{ width: "100px" }}
        >
          <div>
            <button
              className="btn btn-sm btn-primary btn-minus"
              style={{ height: "30px" }}
              onClick={handleMinus}
            >
              <FaMinus></FaMinus>
            </button>
          </div>
          <button
            className="btn btn-light border-none px-2 py-0 rounded d-flex "
            style={{ height: "30px" }}
          >
            <p> {btnValue}</p> <p>gm</p>
          </button>
          <div>
            <button
              className="btn btn-sm btn-primary btn-plus"
              style={{ height: "30px" }}
              onClick={handlePlus}
            >
              <FaPlus></FaPlus>
            </button>
          </div>
        </div>
      </td>
      <td className="align-middle">{itemTotal.toFixed(2)}</td>
      <td className="align-middle">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleDelete(item, itemTotal)}
        >
          <FaTimes></FaTimes>
        </button>
      </td>
    </tr>
  );
}

export default Row;
