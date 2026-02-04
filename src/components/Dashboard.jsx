import { useEffect, useState } from "react";
import API from "../services/api";
import SummaryCard from "./SummaryCard";
import TransactionList from "./TransactionList";
import AddTransactionModal from "./AddTransactionModal";

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
  });

  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [range, setRange] = useState("monthly");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [divisionFilter, setDivisionFilter] = useState("");

  // Fetch summary
  const fetchSummary = async (selectedRange = range) => {
    const res = await API.get(`/summary?range=${selectedRange}`);
    setSummary(res.data);
  };


  // Fetch transactions
  const fetchTransactions = async () => {
    let query = "";

    if (categoryFilter) query += `category=${categoryFilter}&`;
    if (divisionFilter) query += `division=${divisionFilter}&`;

    const res = await API.get(`/transactions?${query}`);
    setTransactions(res.data);
  };


  // Refresh everything
  const refreshAll = async () => {
    setLoading(true);
    await fetchSummary(range);
    await fetchTransactions();
    setLoading(false);
  };



  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <>
      <div className="flex space-between">
        <h1>Money Manager</h1>
        <button onClick={() => setShowModal(true)} className="add-btn">+ Add</button>
      </div>
      {loading && <p>Loading data...</p>}

      <select
        value={range}
        onChange={(e) => {
          setRange(e.target.value);
          fetchSummary(e.target.value);
        }}
        style={{ marginBottom: "15px", padding: "5px" }}
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {!loading && (
        <>
          <div className="flex">
            <SummaryCard title="Income" amount={`₹${summary.totalIncome}`} />
            <SummaryCard title="Expense" amount={`₹${summary.totalExpense}`} />
            <SummaryCard title="Balance" amount={`₹${summary.balance}`} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Filter by category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />

            <select
              value={divisionFilter}
              onChange={(e) => setDivisionFilter(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="">All</option>
              <option value="personal">Personal</option>
              <option value="office">Office</option>
            </select>

            <button onClick={fetchTransactions} style={{ marginLeft: "10px" }}>
              Apply Filter
            </button>
          </div>

          <TransactionList
            transactions={transactions}
            refreshAll={refreshAll}
          />
        </>
      )}

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSuccess={refreshAll}
        />
      )}
    </>
  );
};

export default Dashboard;
