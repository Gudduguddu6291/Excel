import React, { useCallback, useState } from 'react'
import { FileUploadSection } from '../components/FileUploadSection';
import { FilePreview } from '../components/FilePreview';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { FileSpreadsheet, Download, RotateCcw, ChevronLeft, ChevronRight, Upload, X } from 'lucide-react';
function GraphPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback((fileData) => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploadedFile(fileData);
      setIsUploading(false);
    }, 1000);
  }, []);

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };
  return (
    
    <div>
       <main className="relative min-h-[calc(100vh-88px)] flex flex-col items-center justify-center p-8">
        <AnimatePresence mode="wait">
          {!uploadedFile ? (
            <motion.div
              key="upload"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="w-full max-w-2xl"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl mb-4">Upload Excel or CSV File</h1>
              </div>
              
              <FileUploadSection 
                onFileUpload={handleFileUpload}
                isUploading={isUploading}
              />
              
              <div className="flex justify-center mt-8">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg"
                  disabled={true}
                >
                  Generate Graph
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-full flex flex-col"
            >
              <FilePreview file={uploadedFile} onRemove={handleRemoveFile} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Upload Section - appears in corner when file is uploaded */}
        <AnimatePresence>
          {uploadedFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0, x: 100, y: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0, x: 100, y: 100 }}
              transition={{ delay: 0.5, type: "spring", damping: 20 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Card className="p-4 bg-gray-800 border-gray-700 shadow-xl">
                <div className="flex items-center space-x-3">
                  <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                  <div className="text-sm">
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-gray-400">{uploadedFile.data.length} rows</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default GraphPage;
