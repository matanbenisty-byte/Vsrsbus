import React, { useEffect, useMemo, useState } from "react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/a/macros/verstill.com/s/AKfycbwze2DEsWFDEly9VjKqHHm2fxl4CgAkppadj7fPCNqLHVMOpIKLpLGnmECwjZSo0sc/exec";
const todayStr = new Date().toISOString().slice(0, 10);
const currentMonth = todayStr.slice(0, 7);

const initialEmployees = [
  { id: "e1", name: "Matan" },
  { id: "e2", name: "Noa" },
  { id: "e3", name: "Dana" },
];

const initialMenu = [
  { id: "m1", name: "כריכים", price: 67 },
  { id: "m2", name: "קינוחים", price: 65 },
  { id: "m3", name: "ארוחות", price: 67 },
  { id: "m4", name: "אסדו", price: 78 },
  { id: "m5", name: "חציל", price: 59 },
  { id: "m6", name: "שניצל", price: 59 },
  { id: "m7", name: "סביח", price: 62 },
  { id: "m8", name: "סנדוויץ'", price: 62 },
];

const initialOrders = [];

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "24px",
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: "20px",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    marginTop: "8px",
    color: "#475569",
  },
  actionsRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
    padding: "16px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  },
  statValue: {
    fontSize: "28px",
    fontWeight: 700,
    marginTop: "8px",
  },
  tabs: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  tab: {
    padding: "10px 16px",
    borderRadius: "999px",
    border: "1px solid #cbd5e1",
    background: "white",
    cursor: "pointer",
  },
  tabActive: {
    background: "#0f172a",
    color: "white",
    border: "1px solid #0f172a",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: 700,
    marginTop: 0,
    marginBottom: "16px",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "16px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "14px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #0f172a",
    background: "#0f172a",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonSecondary: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "white",
    color: "#0f172a",
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonDanger: {
    padding: "8px 12px",
    borderRadius: "10px",
    border: "1px solid #fecaca",
    background: "#fff1f2",
    color: "#b91c1c",
    cursor: "pointer",
    fontWeight: 600,
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #e2e8f0",
  },
  listRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    background: "white",
    marginTop: "8px",
  },
  message: {
    marginBottom: "16px",
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    background: "white",
    borderRadius: "12px",
    color: "#334155",
  },
  empty: {
    color: "#64748b",
  },
};

function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <div style={{ color: "#475569", fontSize: "14px" }}>{title}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

export default function WorkplaceFoodOrderApp() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [menu, setMenu] = useState(initialMenu);
  const [orders, setOrders] = useState(initialOrders);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [newEmployee, setNewEmployee] = useState("");
  const [newDishName, setNewDishName] = useState("");
  const [newDishPrice, setNewDishPrice] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDish, setSelectedDish] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const getEmployeeName = (id) => employees.find((e) => e.id === id)?.name || "Unknown";
  const getDish = (id) => menu.find((m) => m.id === id);

  const dailyOrders = useMemo(() => {
    return orders
      .filter((o) => o.date === selectedDate)
      .map((o, idx) => ({
        rowId: `${o.date}-${o.employeeId}-${idx}`,
        employeeName: getEmployeeName(o.employeeId),
        dishName: getDish(o.menuItemId)?.name || "Unknown",
        price: Number(getDish(o.menuItemId)?.price || 0),
      }))
      .sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  }, [orders, selectedDate, employees, menu]);

  const dailyTotal = useMemo(() => {
    return dailyOrders.reduce((sum, row) => sum + row.price, 0);
  }, [dailyOrders]);

  const monthlySummary = useMemo(() => {
    return employees.map((employee) => {
      const employeeOrders = orders.filter(
        (o) => o.employeeId === employee.id && String(o.date).startsWith(currentMonth)
      );

      const totalMeals = employeeOrders.length;
      const totalCost = employeeOrders.reduce((sum, order) => {
        return sum + Number(getDish(order.menuItemId)?.price || 0);
      }, 0);

      return {
        employeeId: employee.id,
        employeeName: employee.name,
        totalMeals,
        totalCost,
      };
    });
  }, [employees, orders, menu]);

  const loadFromGoogleSheets = async () => {
    try {
      setIsLoading(true);
      setStatusMessage("טוען נתונים מ-Google Sheets...");
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();

      if (Array.isArray(data.employees)) setEmployees(data.employees);
      if (Array.isArray(data.menu)) {
        setMenu(
          data.menu.map((item) => ({
            ...item,
            price: Number(item.price || 0),
          }))
        );
      }
      if (Array.isArray(data.orders)) setOrders(data.orders);

      setStatusMessage("הנתונים נטענו מ-Google Sheets.");
    } catch (error) {
      console.error(error);
      setStatusMessage("שגיאה בטעינת הנתונים מ-Google Sheets.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveToGoogleSheets = async (nextEmployees = employees, nextMenu = menu, nextOrders = orders) => {
    try {
      setIsSaving(true);
      setStatusMessage("שומר נתונים ל-Google Sheets...");
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          employees: nextEmployees,
          menu: nextMenu,
          orders: nextOrders,
        }),
      });
      setStatusMessage("הנתונים נשמרו ל-Google Sheets.");
    } catch (error) {
      console.error(error);
      setStatusMessage("שגיאה בשמירת הנתונים ל-Google Sheets.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    loadFromGoogleSheets();
  }, []);

  const addEmployee = () => {
    if (!newEmployee.trim()) return;
    const nextEmployees = [
      ...employees,
      { id: `e${Date.now()}`, name: newEmployee.trim() },
    ];
    setEmployees(nextEmployees);
    setNewEmployee("");
    saveToGoogleSheets(nextEmployees, menu, orders);
  };

  const addDish = () => {
    if (!newDishName.trim() || !newDishPrice) return;
    const nextMenu = [
      ...menu,
      {
        id: `m${Date.now()}`,
        name: newDishName.trim(),
        price: Number(newDishPrice),
      },
    ];
    setMenu(nextMenu);
    setNewDishName("");
    setNewDishPrice("");
    saveToGoogleSheets(employees, nextMenu, orders);
  };

  const removeEmployee = (id) => {
    const nextEmployees = employees.filter((e) => e.id !== id);
    const nextOrders = orders.filter((o) => o.employeeId !== id);
    setEmployees(nextEmployees);
    setOrders(nextOrders);
    saveToGoogleSheets(nextEmployees, menu, nextOrders);
  };

  const removeDish = (id) => {
    const nextMenu = menu.filter((m) => m.id !== id);
    const nextOrders = orders.filter((o) => o.menuItemId !== id);
    setMenu(nextMenu);
    setOrders(nextOrders);
    saveToGoogleSheets(employees, nextMenu, nextOrders);
  };

  const placeOrder = () => {
    if (!selectedEmployee || !selectedDish) return;

    const alreadyOrdered = orders.some(
      (o) => o.date === selectedDate && o.employeeId === selectedEmployee
    );

    let nextOrders = [];

    if (alreadyOrdered) {
      nextOrders = orders.map((o) =>
        o.date === selectedDate && o.employeeId === selectedEmployee
          ? { ...o, menuItemId: selectedDish }
          : o
      );
    } else {
      nextOrders = [
        ...orders,
        {
          date: selectedDate,
          employeeId: selectedEmployee,
          menuItemId: selectedDish,
        },
      ];
    }

    setOrders(nextOrders);
    setSelectedEmployee("");
    setSelectedDish("");
    saveToGoogleSheets(employees, menu, nextOrders);
  };

  const removeOrder = (employeeId, menuItemId) => {
    const index = orders.findIndex(
      (o) =>
        o.date === selectedDate &&
        o.employeeId === employeeId &&
        o.menuItemId === menuItemId
    );

    if (index === -1) return;

    const nextOrders = orders.filter((_, i) => i !== index);
    setOrders(nextOrders);
    saveToGoogleSheets(employees, menu, nextOrders);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Workplace Food Orders</h1>
            <div style={styles.subtitle}>Daily meal ordering with monthly employee tracking</div>
          </div>

          <div style={styles.actionsRow}>
            <button style={styles.buttonSecondary} onClick={loadFromGoogleSheets} disabled={isLoading}>
              {isLoading ? "Loading..." : "Sync"}
            </button>
            <button style={styles.buttonSecondary} onClick={() => saveToGoogleSheets()} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
            <input
              style={styles.input}
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {statusMessage ? <div style={styles.message}>{statusMessage}</div> : null}

        <div style={styles.statsGrid}>
          <StatCard title="Today Orders" value={dailyOrders.length} />
          <StatCard title="Employees" value={employees.length} />
          <StatCard title="Daily Total" value={`₪${dailyTotal}`} />
        </div>

        <div style={styles.tabs}>
          {[
            { key: "orders", label: "New Order" },
            { key: "daily", label: "Daily Output" },
            { key: "monthly", label: "Monthly Summary" },
            { key: "settings", label: "Setup" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                ...styles.tab,
                ...(activeTab === tab.key ? styles.tabActive : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "orders" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Create / Update Employee Order</h2>
            <div style={styles.grid3}>
              <div style={styles.field}>
                <label style={styles.label}>Employee</label>
                <select
                  style={styles.input}
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                  <option value="">Select employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Dish</label>
                <select
                  style={styles.input}
                  value={selectedDish}
                  onChange={(e) => setSelectedDish(e.target.value)}
                >
                  <option value="">Select dish</option>
                  {menu.map((dish) => (
                    <option key={dish.id} value={dish.id}>
                      {dish.name} - ₪{dish.price}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ ...styles.field, justifyContent: "flex-end" }}>
                <label style={styles.label}>&nbsp;</label>
                <button style={styles.button} onClick={placeOrder}>Save Order</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "daily" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Orders for {selectedDate}</h2>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Employee</th>
                    <th style={styles.th}>Dish</th>
                    <th style={styles.th}>Price</th>
                    <th style={styles.th}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyOrders.length > 0 ? (
                    dailyOrders.map((row, idx) => {
                      const rawOrder = orders.filter((o) => o.date === selectedDate)[idx];
                      return (
                        <tr key={row.rowId}>
                          <td style={styles.td}>{row.employeeName}</td>
                          <td style={styles.td}>{row.dishName}</td>
                          <td style={styles.td}>₪{row.price}</td>
                          <td style={styles.td}>
                            <button
                              style={styles.buttonDanger}
                              onClick={() => removeOrder(rawOrder.employeeId, rawOrder.menuItemId)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td style={styles.td} colSpan="4">
                        <span style={styles.empty}>No orders yet for this day</span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "monthly" && (
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Monthly Tracking ({currentMonth})</h2>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Employee</th>
                    <th style={styles.th}>Meals This Month</th>
                    <th style={styles.th}>Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlySummary.map((row) => (
                    <tr key={row.employeeId}>
                      <td style={styles.td}>{row.employeeName}</td>
                      <td style={styles.td}>{row.totalMeals}</td>
                      <td style={styles.td}>₪{row.totalCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={styles.grid2}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Add Employee</h2>
              <div style={styles.field}>
                <label style={styles.label}>Employee Name</label>
                <input
                  style={styles.input}
                  value={newEmployee}
                  onChange={(e) => setNewEmployee(e.target.value)}
                  placeholder="Enter employee name"
                />
              </div>
              <button style={styles.button} onClick={addEmployee}>Add Employee</button>

              <div style={{ marginTop: "16px" }}>
                {employees.map((emp) => (
                  <div key={emp.id} style={styles.listRow}>
                    <span>{emp.name}</span>
                    <button style={styles.buttonDanger} onClick={() => removeEmployee(emp.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Add Menu Item</h2>
              <div style={styles.field}>
                <label style={styles.label}>Dish Name</label>
                <input
                  style={styles.input}
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="Enter dish name"
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Price</label>
                <input
                  style={styles.input}
                  type="number"
                  value={newDishPrice}
                  onChange={(e) => setNewDishPrice(e.target.value)}
                  placeholder="Enter price"
                />
              </div>
              <button style={styles.button} onClick={addDish}>Add Dish</button>
            </div>

            <div style={{ ...styles.card, gridColumn: "1 / -1" }}>
              <h2 style={styles.sectionTitle}>Current Menu</h2>
              <div style={styles.grid3}>
                {menu.map((dish) => (
                  <div key={dish.id} style={styles.listRow}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{dish.name}</div>
                      <div style={{ color: "#475569", marginTop: "4px" }}>₪{dish.price}</div>
                    </div>
                    <button style={styles.buttonDanger} onClick={() => removeDish(dish.id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
