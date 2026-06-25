import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import TransactionForm from "../components/TransactionForm.jsx";
import Transactioncharts from "../components/Transactioncharts.jsx"
const getTransactionDateKey = (dateValue) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

const formatDateTime = (dateValue) => {
  if (!dateValue) return "—";
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

function Dashboard() {
    const [filterType, setFilterType] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState(() => {
    return localStorage.getItem("budget") || 20000;
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const fetchTransactions = async () => {
  try {
    const res = await API.get("/transactions");

    console.log("FULL RESPONSE =", res);
    console.log("DATA =", res.data);

    setTransactions(res.data);
  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Failed to fetch transactions");
  } finally {
    setLoading(false);
  }
};

const deleteTransaction = async (id) => {
  try {
    await API.delete(`/transactions/${id}`);
    setEditingTransaction(null);
    fetchTransactions();
  } catch (error) {
    alert(error.response?.data?.message || "Failed to delete transaction");
  }
};

     useEffect(() => {
    fetchTransactions();    //api call to get transactions
  }, []);

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

 

  const totalIncome = transactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const totalExpense = transactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + Number(t.amount), 0);

const balance = totalIncome - totalExpense;
const safeBudget = Number(budget) || 1;

const remaining = safeBudget - totalExpense;

const percentage = Math.min(
  (totalExpense / safeBudget) * 100,
  100
);

const filteredTransactions = transactions.filter((t) => {

  const matchesType =
    filterType === "all" || t.type === filterType;

  const matchesSearch =
    t.category||"-".toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.note||"-".toLowerCase().includes(searchTerm.toLowerCase());
  const matchesDate =
    !selectedDate || getTransactionDateKey(t.date) === selectedDate;
  return matchesType && matchesSearch && matchesDate;
});
const categoryTotals = transactions
  .filter((t) => t.type === "expense")
  .reduce((acc, t) => {
    const category = t.category || "Other";
    acc[category] = (acc[category] || 0) + Number(t.amount);
    return acc;
  }, {});

  const exportCSV = () => {
    const headers = ["Date", "Category", "Type", "Amount", "Note"];
  
    const rows = filteredTransactions.map((t) => [
      formatDateTime(t.createdAt),
      t.category,
      t.type,
      t.amount,
      t.note || "",
    ]);
  
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");
  
    const blob = new Blob([csvContent], {
      type: "text/csv",
    });
  
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "spendwise-transactions.csv";
    a.click();
  
    URL.revokeObjectURL(url);
  };
  


return (
  <div className="container">
    <h1>SpendWise Dashboard</h1>

    <div className="card">
      <h2>Transactions</h2>
      <div className="filter-controls">

      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="text"
        placeholder="Search category or note"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <button onClick={exportCSV}>
         Export CSV
    </button>
    </div>
    </div>

    <div className="summary">
      <div className="summary-card income-card">
        <p>Total Income</p>
        <h2 className="income">₹{totalIncome}</h2>
      </div>

      <div className="summary-card expense-card">
        <p>Total Expense</p>
        <h2 className="expense">₹{totalExpense}</h2>
      </div>

      <div className="summary-card balance-card">
        <p>Balance</p>
        <h2 className={balance >= 0 ? "positive-balance" : "negative-balance"}>
          ₹{balance}
        </h2>
      </div>
    </div>

    
    <div className="card budget-card">


  <h2>Monthly Budget</h2>

  <input
    className="budget-input"
    type="number"
    value={budget}
    onChange={(e) => setBudget(Number(e.target.value))}
  />

  <div className="budget-details">
    <p>
      <strong>Budget:</strong> ₹{safeBudget}
    </p>

    <p className="expense">
      <strong>Spent:</strong> ₹{totalExpense}
    </p>

    <p className={remaining >= 0 ? "income" : "expense"}>
      <strong>Remaining:</strong> ₹{remaining}
    </p>
   </div>

  <div className="progress">
    <div
      className="progress-fill"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
</div>

    <Transactioncharts categoryTotals={categoryTotals} />

    <div className="card">
      <TransactionForm
        onTransactionAdded={fetchTransactions}
        editingTransaction={editingTransaction}
        setEditingTransaction={setEditingTransaction}
      />
    </div>

    {!loading &&
      filteredTransactions.map((transaction) => (
        
        <div
        key={transaction._id}
        className={`card transaction-card ${
          transaction.type === "income" ? "income-border" : "expense-border"
        }`}
      
      >
         
          <h3>{transaction.category}</h3>
          <p>Amount: ₹{transaction.amount}</p>

          <p className={transaction.type === "income" ? "income" : "expense"}>
            Type: {transaction.type}
          </p>

          <p>Note: {transaction.note || "—"}</p>
          <p>Added: {formatDateTime(transaction.createdAt)}</p>

          {transaction.updatedAt &&
            new Date(transaction.updatedAt).getTime() !==
              new Date(transaction.createdAt).getTime() && (
              <p>Updated: {formatDateTime(transaction.updatedAt)}</p>
            )}

          <button onClick={() => setEditingTransaction(transaction)}>
            Edit
          </button>

          <button
            className="delete"
            onClick={() => deleteTransaction(transaction._id)}
          >
            Delete
          </button>
        </div>
      ))}
  </div>
);
};

export default Dashboard;