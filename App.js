import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([{ id: 1, name: "bút", price: 10000 }]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const editProduct = (updatedProduct) => {
    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <Router>
      <div style={styles.container}>
        <Routes>
          <Route
            path="/"
            element={<HomePage products={products} onDelete={deleteProduct} />}
          />
          <Route
            path="/add"
            element={<FormPage onSubmit={addProduct} />}
          />
          <Route
            path="/edit/:id"
            element={<FormPage products={products} onSubmit={editProduct} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

// HomePage Component
const HomePage = ({ products, onDelete }) => {
  const navigate = useNavigate();
  const total = useMemo(() => products.reduce((sum, p) => sum + p.price, 0), [products]);

  return (
    <div>
      <h1 style={styles.title}>Bảng Thông Tin</h1>
      <div style={styles.actions}>
        <button style={styles.addButton} onClick={() => navigate("/add")}>Thêm Hàng Hóa</button>
        <input type="text" placeholder="Tìm kiếm..." style={styles.searchInput} />
      </div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Tên</th>
            <th style={styles.th}>Giá</th>
            <th style={styles.th}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={styles.td}>{product.name}</td>
              <td style={styles.td}>{product.price.toLocaleString()} VND</td>
              <td style={styles.td}>
                <button
                  style={styles.editButton}
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  Chỉnh sửa
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => onDelete(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td style={styles.td}><b>Tổng số</b></td>
            <td style={styles.td}><b>{total.toLocaleString()} VND</b></td>
            <td style={styles.td}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// FormPage Component
const FormPage = ({ products = [], onSubmit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editingProduct = products.find((p) => p.id === Number(id)) || { name: "", price: 0 };
  const [name, setName] = useState(editingProduct.name);
  const [price, setPrice] = useState(editingProduct.price);

  const handleSubmit = () => {
    onSubmit({ ...editingProduct, name, price: Number(price) });
    navigate("/");
  };

  return (
    <div>
      <h1 style={styles.title}>{id ? "Chỉnh sửa Hàng Hóa" : "Thêm Hàng Hóa"}</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Giá sản phẩm"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        <button style={styles.saveButton} onClick={handleSubmit}>
          Lưu
        </button>
      </div>
    </div>
  );
};

// CSS styles as JS object
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px auto",
    maxWidth: "800px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  addButton: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  searchInput: {
    width: "60%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  editButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    marginRight: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
};

export default App;