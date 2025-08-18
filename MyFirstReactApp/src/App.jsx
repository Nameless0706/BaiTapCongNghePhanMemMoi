import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>

      {/* 🔹 Thông tin cá nhân */}
      <div style={{ marginTop: "5px", padding: "10px", border: "2px solid #888", borderRadius: "12px" }}>
        <h2>Thông tin cá nhân</h2>
        <p><strong>Họ tên:</strong> Huỳnh Quốc Thắng</p>
        <p><strong>MSSV:</strong> 22110423</p>
        <p><strong>Trường:</strong> Đại học Sư Phạm Kỹ Thuật TP.HCM</p>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
