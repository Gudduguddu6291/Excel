import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
export default function GraphPage() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const fileInput = useRef();
  const handleFiles = (files) => {
    const f = files[0];
    if (!f) return;
    setFile(f);

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const dataArr = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setData(dataArr);
    };
    reader.readAsBinaryString(f);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const handleDragOver = (e) => e.preventDefault();

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: "2rem 1rem" }}>
      <h2 style={{ textAlign: "center", fontWeight: 500, fontSize: "1.5rem" }}>
        Upload Excel or CSV File
      </h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #1976d2",
          borderRadius: 8,
          padding: 32,
          cursor: "pointer",
          color: "#1976d2",
          textAlign: "center",
          fontSize: "1rem",
          background: "#fafcff",
          marginBottom: 32,
          transition: "border .2s"
        }}
        onClick={() => fileInput.current.click()}
      >
        Drag & drop your file here,<br />or <span style={{ textDecoration: "underline" }}>click to choose</span>
        <input
          ref={fileInput}
          type="file"
          accept=".xlsx,.xls,.csv"
          style={{ display: "none" }}
          onChange={e => handleFiles(e.target.files)}
        />
      </div>
      {file && (
        <div style={{ marginBottom: 24, textAlign: "center", color: "#555", fontSize: "0.95rem" }}>
          <span style={{
            display: "inline-block",
            background: "#eef2fa",
            borderRadius: 6,
            padding: "6px 14px",
            border: "1px solid #e3e7ef",
            marginBottom: 12
          }}>
            {file.name}
          </span>
        </div>
      )}
      {data && (
        <div style={{ overflowY: "auto", borderRadius: 6, border: "none", background: "#27272a" , color:"#fafafa"}}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "0.96rem" }}>
            <tbody>
              {data.slice(0, 10).map((row, i) => (
                <tr key={i} style={{ background: i === 0 ? "#27272a" : "none" }}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        border: "1px solid ",
                        padding: "6px 12px",
                        textAlign: "left",
                        fontWeight: i === 0 ? 600 : 400,
                        color: "#fafafa"
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
              {data.length > 10 && (
                <tr>
                  <td style={{ color: "#fafafa", fontSize: 13, padding: 8 }} colSpan={data[0].length}>
                    ...and {data.length - 10} more rows
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center w-full">
       <motion.button
          whileHover={{ scale: 1.07, filter: "brightness(1.07)" }}
          whileTap={{ scale: 0.97 }}
          className="gap-2 text-lg px-4 py-2 bg-gradient-to-br from-chart-6 to-chart-5 hover:from-chart-5 hover:to-chart-6 transition-all duration-300 shadow-lg backdrop-blur-sm cursor-pointer flex items-center rounded-md font-medium justify-center align-center mt-4"
          
        >Generate Graph</motion.button>
        </div>
    </div>
  );
}