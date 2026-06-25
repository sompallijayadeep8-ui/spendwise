import API from "../api/axiosInstance";
import { useEffect, useState } from "react";

function TransactionForm({ onTransactionAdded, editingTransaction, setEditingTransaction }) {
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: "",
    note: "",
   
  });
  useEffect(() => {
  if (editingTransaction) {
    setForm({
      amount: editingTransaction.amount,
      type: editingTransaction.type,
      category: editingTransaction.category,
      note: editingTransaction.note || "",
    });
  }
}, [editingTransaction]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     if (editingTransaction) {
       await API.put(`/transactions/${editingTransaction._id}`, form);
        setEditingTransaction(null);
      } else {
        await API.post("/transactions", form);
       }

      setForm({
        amount: "",
        type: "expense",
        category: "",
        note: "",
      });

      onTransactionAdded();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>

      <input
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />

      <input
        name="note"
        placeholder="Note"
        value={form.note}
        onChange={handleChange}
      />

      <button type="submit">
        {editingTransaction ?"update":"Add"}
      </button>
      {editingTransaction && (
  <button type="button" onClick={() => setEditingTransaction(null)}>
    Cancel Edit
  </button>
)}
    </form>

   
  );
}

export default TransactionForm;