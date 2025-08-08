import React, { useCallback, useState } from "react";
import { motion } from "motion/react";
import { Upload, FileSpreadsheet, Loader2 } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// No types or interfaces in plain JS.

export function FileUploadSection({ onFileUpload, isUploading }) {
  const [isDragOver, setIsDragOver] = useState(false);

  // Parse CSV with PapaParse
  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          const data = results.data;
          const headers = data[0] || [];
          const rows = data.slice(1);
          resolve({
            name: file.name,
            data: rows,
            headers,
          });
        },
        error: reject,
        header: false,
      });
    });
  };

  // Parse Excel with xlsx
  const parseExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
          });
          const headers = jsonData[0] || [];
          const rows = jsonData.slice(1);

          resolve({
            name: file.name,
            data: rows,
            headers,
          });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFile = async (file) => {
    if (!file) return;

    const isCSV = file.name.toLowerCase().endsWith(".csv");
    const isExcel = file.name.toLowerCase().match(/\.(xlsx?|xls)$/);

    if (!isCSV && !isExcel) {
      alert("Please upload a CSV or Excel file");
      return;
    }

    try {
      let fileData;
      if (isCSV) {
        fileData = await parseCSV(file);
      } else {
        fileData = await parseExcel(file);
      }
      onFileUpload(fileData);
    } catch (error) {
      console.error("Error parsing file:", error);
      alert("Error parsing file. Please try again.");
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", damping: 25 }}
    >
      <div
        className={`
          border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
          ${isDragOver ? "border-blue-400 bg-blue-400/10" : "border-gray-600 bg-gray-800/50"}
          ${isUploading ? "pointer-events-none opacity-50" : "hover:border-blue-400 hover:bg-blue-400/5"}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{
              rotate: isUploading ? 360 : 0,
              scale: isDragOver ? 1.1 : 1,
            }}
            transition={{
              rotate: {
                duration: 1,
                repeat: isUploading ? Infinity : 0,
                ease: "linear",
              },
              scale: { type: "spring", damping: 25 },
            }}
          >
            {isUploading ? (
              <Loader2 className="w-12 h-12 text-blue-400" />
            ) : (
              <FileSpreadsheet className="w-12 h-12 text-blue-400" />
            )}
          </motion.div>

          <div className="space-y-2">
            <p className="text-blue-400">
              {isUploading
                ? "Processing file..."
                : "Drag & drop your file here,"}
            </p>
            {!isUploading && (
              <p className="text-gray-400">
                or{" "}
                <span className="text-blue-400 underline cursor-pointer">
                  click to choose
                </span>
              </p>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Supports CSV, XLS, XLSX files
          </p>
        </div>
      </div>
    </motion.div>
  );
}
export default FileUploadSection;
