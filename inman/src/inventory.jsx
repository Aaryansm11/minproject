// src/components/Inventory/Inventory.jsx

import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  useEffect(() => {
    // Fetch inventory data from your API or database
    // Replace the sample URL with your actual API endpoint
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setInventoryData(data))
      .catch((error) => console.error('Error fetching inventory data:', error));
  }, []);

  const handleEdit = (itemId) => {
    setEditItemId(itemId);
    setShowEditModal(true);
  };

  const handleDelete = (itemId) => {
    // Implement delete functionality
    fetch(`http://localhost:3000/items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Item deleted successfully, update the UI or fetch data again
          console.log(`Item with ID ${itemId} deleted successfully`);
          // You may choose to update the UI by fetching data again or updating state
        } else {
          console.error(`Failed to delete item with ID ${itemId}`);
        }
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  const handleAddItem = () => {
    setShowAddItemModal(true);
  };

  const handleEditSubmit = (formData) => {
    // Implement edit functionality
    // Send a POST request with the edited data
    console.log(`Editing item with ID ${editItemId} and data:`, formData);
    // Close the modal
    setShowEditModal(false);
  };

  const handleAddItemSubmit = (formData) => {
    // Implement add item functionality
    // Send a POST request with the new item data
    console.log('Adding a new item with data:', formData);
    // Close the modal
    setShowAddItemModal(false);
  };

  return (
    <div className="inventory-container">
      <h2>Inventory</h2>
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
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-section">
        <button onClick={handleAddItem}>Add New Item</button>
      </div>

      {/* Edit Item Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            {/* Add your form elements for editing here */}
            <button onClick={() => setShowEditModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Add New Item Modal */}
      {showAddItemModal && (
        <div className="modal">
          <div className="modal-content">
            {/* Add your form elements for adding a new item here */}
            <button onClick={() => setShowAddItemModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
