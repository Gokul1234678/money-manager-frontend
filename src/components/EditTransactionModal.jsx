import { useState } from "react";
import API from "../services/api";

const EditTransactionModal = ({ transaction, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    type: transaction.type,
    amount: transaction.amount,
    category: transaction.category,
    division: transaction.division,
    description: transaction.description || "",
    date: transaction.date.split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/transactions/${transaction._id}`, {
        ...form,
        amount: Number(form.amount),
      });

      await onSuccess();
      onClose();
    } catch (error) {
      if (error.response?.status === 403) {
        alert("Edit not allowed after 12 hours");
      } else {
        alert("Failed to update transaction");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Transaction</h3>

        <form onSubmit={handleSubmit}>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
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
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button type="submit">Update</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
