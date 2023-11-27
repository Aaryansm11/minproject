import React, { useState, useEffect } from "react";
import "./inventory.css";

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [formValues, setFormValues] = useState({
    category: "",
    item: "",
    qty: 0,
    price: 0,
  });

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = () => {
    fetch("http://localhost:3000/items")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setInventoryData(data))
      .catch((error) => console.error("Error fetching inventory data:", error));
  };

  const handleEdit = (itemId) => {
    setEditItemId(itemId);
    setShowEditModal(true);

    const selectedItem = inventoryData.find((item) => item._id === itemId);
    setFormValues({
      category: selectedItem.category,
      item: selectedItem.item,
      qty: selectedItem.qty,
      price: selectedItem.price,
    });
  };

  const handleDelete = (itemId) => {
    fetch(`http://localhost:3000/items/${itemId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Item with ID ${itemId} deleted successfully`);
          setInventoryData((prevData) =>
            prevData.filter((item) => item._id !== itemId),
          );
        } else {
          console.error(`Failed to delete item with ID ${itemId}`);
        }
      })
      .catch((error) => console.error("Error deleting item:", error));
  };

  const handleAddItem = () => {
    setShowAddItemModal(true);
    setFormValues({
      category: "",
      item: "",
      qty: 0,
      price: 0,
    });
  };

  const handleEditSubmit = () => {
    fetch(`http://localhost:3000/items/${editItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Editing item with ID ${editItemId} successful`);
          setShowEditModal(false);
          fetchInventoryData();
        } else {
          console.error(`Failed to edit item with ID ${editItemId}`);
        }
      })
      .catch((error) => console.error("Error editing item:", error));
  };

  const handleAddItemSubmit = () => {
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Adding a new item successful");
          setShowAddItemModal(false);
          fetchInventoryData();
        } else {
          console.error("Failed to add a new item");
        }
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="inventory-container">
      <div className="header-container">
        <h1>Inventory</h1>
        <button className="add-item-btn" onClick={handleAddItem}>
          Add New Item
        </button>
      </div>
      <div className="flex-container">
        <div className="inventory-list">
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item._id}>
                  <td>{item.category}</td>
                  <td>{item.item}</td>
                  <td>{item.qty}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => handleEdit(item._id)}>Edit</button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="add-edit-section">
        {showEditModal && (
          <div className="modal">
            <div className="modal-content">
              <form>
                <div className="modal-input-row">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="item"
                    value={formValues.item}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-input-row">
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={formValues.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-input-row">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="qty"
                    value={formValues.qty}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-input-row">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formValues.price}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="button" onClick={handleEditSubmit}>
                  Save Changes
                </button>
                <button type="button" onClick={() => setShowEditModal(false)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
        {showAddItemModal && (
          <div className="modal">
            <div className="modal-content">
              <form>
                <div className="modal-input-row">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="item"
                    value={formValues.item}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-input-row">
                  <label>Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={formValues.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-input-row">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="qty"
                    value={formValues.qty}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="modal-input-row">
                  <label>Price:</label>
                  <input
                    type="number"
                    name="price"
                    value={formValues.price}
                    onChange={handleInputChange}
                  />
                </div>
                <button type="button" onClick={handleAddItemSubmit}>
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddItemModal(false)}
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
