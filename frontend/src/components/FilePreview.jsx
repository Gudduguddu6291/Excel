import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileSpreadsheet, Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function FilePreview({ file, onRemove }) {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(file.data.length / rowsPerPage));

  const startIndex = currentPage * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, file.data.length);
  const currentData = file.data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full flex flex-col"
    >
      {/* File Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <Card className="p-6 bg-gray-800 border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl text-white">{file.name}</h2>
                <p className="text-gray-400">
                  {file.data.length} rows × {file.headers.length} columns
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Upload New
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex-1 flex flex-col"
      >
        <Card className="flex-1 bg-gray-800 border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg text-white">Data Preview</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>
                  Showing {startIndex + 1}-{endIndex} of {file.data.length} rows
                </span>
              </div>
            </div>
          </div>
          
          <div className="overflow-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-700/50">
                  {file.headers.map((header, index) => (
                    <TableHead 
                      key={index} 
                      className="text-gray-300 border-r border-gray-700 last:border-r-0"
                    >
                      {header || `Column ${index + 1}`}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((row, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rowIndex * 0.05 }}
                    className="border-gray-700 hover:bg-gray-700/30 transition-colors"
                  >
                    {file.headers.map((_, colIndex) => (
                      <TableCell 
                        key={colIndex}
                        className="text-gray-300 border-r border-gray-700 last:border-r-0 max-w-xs truncate"
                      >
                        {row[colIndex] || '—'}
                      </TableCell>
                    ))}
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-700 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              
              <span className="text-sm text-gray-400">
                Page {currentPage + 1} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </Card>
      </motion.div>

      {/* Generate Graph Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 flex justify-center"
      >
        <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg">
          Generate Graph
        </Button>
      </motion.div>
    </motion.div>
  );
}
export default FilePreview;
