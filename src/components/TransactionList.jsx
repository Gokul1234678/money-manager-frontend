import { useState } from "react";
import EditTransactionModal from "./EditTransactionModal";

const TransactionList = ({ transactions, refreshAll }) => {
    if (!transactions) {
    return <p className="loader">Loading transactions...</p>;
  }
  const [selectedTxn, setSelectedTxn] = useState(null);

  return (
    <div className="card">
      <h3>Transactions</h3>

      <table width="100%">
        <thead>
          <tr>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn.type}</td>
              <td>{txn.category}</td>
              <td
                style={{ color: txn.type === "income" ? "green" : "red" }}
              >
                ₹{txn.amount}
              </td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => setSelectedTxn(txn)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTxn && (
        <EditTransactionModal
          transaction={selectedTxn}
          onClose={() => setSelectedTxn(null)}
          onSuccess={refreshAll}
        />
      )}
    </div>
  );
};

export default TransactionList;
