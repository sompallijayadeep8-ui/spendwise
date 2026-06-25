import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
  
  function TransactionChart({ categoryTotals }) {
    const data = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  
    const totalExpense = data.reduce((sum, item) => sum + item.value, 0);
  
    const COLORS = [
      "#ef4444",
      "#f97316",
      "#eab308",
      "#ec4899",
      "#8b5cf6",
      "#06b6d4",
      "#3b82f6",
    ];
  
    if (data.length === 0) {
      return (
        <div className="card">
          <h2>Expense Distribution</h2>
          <p>No expense data available.</p>
        </div>
      );
    }
  
    return (
      <div className="card chart-card">
        <h2>Expense Distribution</h2>
  
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
  
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
  
          <div className="chart-center">
            <p>Total Expense</p>
            <h3>₹{totalExpense}</h3>
          </div>
        </div>
      </div>
    );
  }
  
  export default TransactionChart;