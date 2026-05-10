import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileCode, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const res = await fetch('http://localhost:4000/api/submissions/upload', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl"
      >
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Upload Engine</h1>
        <p className="text-slate-400 mb-8">Submit your orderbook or matching engine for benchmarking.</p>

        <div className="border-2 border-dashed border-white/20 rounded-xl p-12 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer relative">
          <input 
            type="file" 
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Upload className="w-12 h-12 text-neonCyan mb-4" />
          <p className="text-lg font-medium text-slate-300">Click or drag file to upload</p>
          <p className="text-sm text-slate-500 mt-2">Supports .zip containing Dockerfile or source code</p>
        </div>

        {file && (
          <div className="mt-6 p-4 rounded-lg bg-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileCode className="w-6 h-6 text-neonPurple" />
              <span className="text-slate-300">{file.name}</span>
            </div>
            <span className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        )}

        <button 
          onClick={handleUpload}
          disabled={!file || status === 'uploading' || status === 'success'}
          className={`w-full mt-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-2 transition-all ${
            status === 'success' ? 'bg-green-500 text-white' : 
            status === 'error' ? 'bg-red-500 text-white' : 
            !file ? 'bg-white/10 text-slate-500 cursor-not-allowed' : 
            'bg-neonCyan text-black hover:bg-cyan-400'
          }`}
        >
          {status === 'uploading' && <span className="animate-pulse">Uploading...</span>}
          {status === 'success' && <><CheckCircle className="w-5 h-5" /><span>Success</span></>}
          {status === 'error' && <><AlertCircle className="w-5 h-5" /><span>Error</span></>}
          {status === 'idle' && <span>Submit Build</span>}
        </button>
      </motion.div>
    </div>
  );
}
