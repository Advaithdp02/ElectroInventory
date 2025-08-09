import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TableView.css';

function TableView({ type, page, setPage }) {
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [showSortPanel, setShowSortPanel] = useState(false);
  const role = JSON.parse(localStorage.getItem("role"));


  useEffect(() => {
    if (type === 'register') return;

    const fetchItems = async () => {
      try {
        const url = type
          ? `http://localhost:3030/api/items?type=${type}&page=${page}&limit=5`
          : `http://localhost:3030/api/items?page=${page}&limit=5`;

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });

        setItems(res.data.items);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    };

    fetchItems();
  }, [type, page]);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3030/api/items/${selectedItem._id}`, selectedItem, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setShowModal(false);
      const res = await axios.get(`http://localhost:3030/api/items?type=${type}&page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setItems(res.data.items);
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:3030/api/items/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const res = await axios.get(`http://localhost:3030/api/items?type=${type}&page=${page}&limit=5`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setItems(res.data.items);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem(prev => ({ ...prev, [name]: value }));
  };

  // Filter
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortField) return 0;
    if (sortOrder === "asc") {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
    }
  });

  // Apply sort settings
  const applySort = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setShowSortPanel(false);
  };

  if (type === 'register') {
    return <div>Register Component Goes Here</div>;
  }

  return (
    <div className="table-view">
      <h2>{type} Items</h2>

      {/* Search & Sort */}
      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Search by name or type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "5px", width: "250px" }}
        />
        <button onClick={() => setShowSortPanel(true)}>
          Sort {sortField ? `(${sortField} - ${sortOrder})` : ""}
        </button>
      </div>

      {/* Sort Panel */}
      {showSortPanel && (
        <div className="sort-panel">
          <h3>Sort Options</h3>
          <div>
            <label>Sort By:</label>
            <button onClick={() => applySort("quantity", sortOrder)}>Quantity</button>
            <button onClick={() => applySort("price", sortOrder)}>Price</button>
          </div>
          <div>
            <label>Order:</label>
            <button onClick={() => applySort(sortField || "quantity", "asc")}>Ascending</button>
            <button onClick={() => applySort(sortField || "quantity", "desc")}>Descending</button>
          </div>
          <button onClick={() => setShowSortPanel(false)}>Close</button>
        </div>
      )}

      {/* Table */}
      <table className="item-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
              {role === "admin" && (
                <td>
                  <button onClick={() => handleEdit(item)}>Update</button>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Update Item</h3>
            <form onSubmit={handleUpdate}>
              <label>
                Name:
                <input type="text" name="name" value={selectedItem.name} onChange={handleChange} />
              </label>
              <label>
                Type:
                <input type="text" name="type" value={selectedItem.type} onChange={handleChange} />
              </label>
              <label>
                Quantity:
                <input type="number" name="quantity" value={selectedItem.quantity} onChange={handleChange} />
              </label>
              <label>
                Price:
                <input type="number" name="price" value={selectedItem.price} onChange={handleChange} />
              </label>
              <div className="modal-actions">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TableView;
