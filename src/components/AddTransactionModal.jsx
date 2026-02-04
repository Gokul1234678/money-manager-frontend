import { useState } from "react";
import API from "../services/api";

const AddTransactionModal = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "",
    division: "personal",
    description: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/transactions", {
        ...form,
        amount: Number(form.amount),
      });

      await onSuccess(); // refresh summary + transactions
      onClose();
    } catch (error) {
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Add Transaction</h3>

        <form onSubmit={handleSubmit}>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="category"
            placeholder="Category (food, salary...)"
            value={form.category}
            required
            onChange={handleChange}
          />

          <select
            name="division"
            value={form.division}
            onChange={handleChange}
          >
            <option value="personal">Personal</option>
            <option value="office">Office</option>
          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            required
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
