import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Banknote, 
  Copy, 
  Check, 
  History, 
  RotateCcw, 
  ArrowRightLeft,
  X
} from 'lucide-react';
import { numberToVietnameseWords, formatCurrency } from './utils/numberToWords';
import { cn } from './lib/utils';

interface ConversionHistory {
  id: string;
  amount: string;
  words: string;
  timestamp: number;
}

export default function App() {
  const [input, setInput] = useState<string>('');
  const [words, setWords] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    if (input) {
      setWords(numberToVietnameseWords(input));
    } else {
      setWords('');
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 15) { // Limit to 15 digits (trillions)
      setInput(value);
    }
  };

  const handleCopy = () => {
    if (!words) return;
    navigator.clipboard.writeText(words);
    setCopied(true);
    
    // Add to history
    const newEntry: ConversionHistory = {
      id: Math.random().toString(36).substr(2, 9),
      amount: formatCurrency(input),
      words: words,
      timestamp: Date.now(),
    };
    
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    
    setTimeout(() => setCopied(false), 2000);
  };

  const clearInput = () => {
    setInput('');
    setWords('');
  };

  return (
    <div className="min-h-screen bg-cyber-dark font-sans text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-200 cyber-grid relative">
      {/* Background Ornaments */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-cyan-500/10 to-transparent" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-12 md:py-20">
        {/* Header */}
        <header className="mb-12 text-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 mb-6 bg-cyber-dark border border-cyan-500/30 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <Banknote className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black tracking-[0.05em] text-white mb-3 uppercase cyber-glow"
          >
            TIỀN SỐ SANG CHỮ
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            className="h-1 bg-cyan-500 mx-auto mb-4 rounded-full"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-cyan-500/60 font-medium text-[10px] uppercase tracking-[0.15em] mb-4"
          >
            Hệ Thống Chuyển Đổi để điền mẫu tính tiền khuyết tật cho nhanh..hehe
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-cyan-400 font-bold text-sm tracking-[0.2em] uppercase"
          >
            Thầy Đạt Toán
          </motion.p>
        </header>

        <main className="space-y-6">
          {/* Main Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-cyber-card backdrop-blur-xl rounded-lg p-8 md:p-10 border border-cyan-500/20 relative shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Cyber corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500" />

            <div className="space-y-10 relative z-10">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="amount" className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/50">
                    Số_Tiền::Dạng_Số
                  </label>
                  <span className="text-[8px] font-mono text-cyan-900 bg-cyan-500/20 px-2 py-0.5 rounded">SẴN SÀNG</span>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-cyan-500/20 rounded-md blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                  <input
                    id="amount"
                    type="text"
                    inputMode="numeric"
                    placeholder="1.203.405.678"
                    value={formatCurrency(input)}
                    onChange={handleInputChange}
                    className="relative w-full bg-black/40 border border-cyan-500/30 focus:border-cyan-400 rounded-md px-6 py-6 text-4xl md:text-5xl font-display font-bold text-cyan-400 outline-none transition-all placeholder:text-cyan-900"
                  />
                  {input && (
                    <button
                      onClick={clearInput}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-cyan-500/50 hover:text-cyan-400 transition-colors"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Transition Divider */}
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                <div className="text-cyan-500/40 p-2 border border-cyan-500/20 rounded-full">
                  <ArrowRightLeft className="w-4 h-4 rotate-90 md:rotate-0" />
                </div>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
              </div>

              {/* Result Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-cyan-500/50">
                    Kết_Quả::Dạng_Chữ
                  </label>
                  {words && (
                    <button
                      onClick={handleCopy}
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase font-bold tracking-tighter transition-all rounded border",
                        copied 
                          ? "bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                          : "text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10"
                      )}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>ĐÃ CHÉP</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>SAO CHÉP</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
                
                <div className={cn(
                  "relative w-full bg-black/60 rounded-md p-8 min-h-[140px] flex items-center justify-center transition-all border border-cyan-500/10 group overflow-hidden",
                  words ? "border-cyan-500/30" : "opacity-40"
                )}>
                  {/* Scanning line effect */}
                  {words && (
                    <motion.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-0.5 bg-cyan-500/20 blur-[1px] z-0 pointer-events-none"
                    />
                  )}
                  
                  <AnimatePresence mode="wait">
                    {words ? (
                      <motion.p
                        key={words}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="text-xl md:text-2xl font-bold text-white leading-relaxed text-center z-10 cyber-glow"
                      >
                        {words}
                      </motion.p>
                    ) : (
                      <p className="text-cyan-900 font-mono text-sm leading-relaxed text-center px-4">
                        Một tỷ hai trăm lẻ ba triệu bốn trăm lẻ năm nghìn sáu trăm bảy mươi tám đồng
                      </p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions / History Toggle */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "flex items-center gap-2 px-8 py-3 rounded-md transition-all text-xs font-bold uppercase tracking-widest",
                showHistory 
                ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]" 
                : "bg-black/40 border border-cyan-500/30 text-cyan-500 hover:border-cyan-400"
              )}
            >
              <History className="w-4 h-4" />
              <span>LỊCH SỬ ({history.length})</span>
            </button>
          </div>

          {/* History Panel */}
          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="overflow-hidden"
              >
                <div className="bg-black/60 rounded-lg p-6 border border-cyan-500/20 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-cyan-500/10 pb-4">
                    <h3 className="text-[10px] font-bold text-cyan-500/70 uppercase tracking-widest">Bản_Ghi_Gần_Đây</h3>
                    <button 
                      onClick={() => setHistory([])}
                      className="text-[9px] font-bold text-red-500/50 hover:text-red-500 uppercase tracking-tighter transition-colors"
                    >
                      [ XÓA_HẾT ]
                    </button>
                  </div>
                  
                  {history.length > 0 ? (
                    <div className="space-y-2">
                      {history.map((item) => (
                        <div key={item.id} className="p-4 bg-cyan-900/10 border border-cyan-500/5 rounded hover:border-cyan-500/30 transition-all group relative">
                          <p className="text-xs font-bold text-cyan-400">{item.amount} VNĐ</p>
                          <p className="text-[10px] text-cyan-500/60 line-clamp-1 italic mt-1">{item.words}</p>
                          <button
                            onClick={() => {
                              setInput(item.amount.replace(/[^0-9]/g, ''));
                              setShowHistory(false);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-cyan-400"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-cyan-900">
                      <p className="text-[10px] uppercase tracking-widest font-mono">Dữ_Liệu_Trống</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-16 text-center">
          <p className="text-[9px] font-mono text-cyan-900 uppercase tracking-[0.3em]">
            THỜI_GIAN_HỆ_THỐNG::2077 // MÃ_HÓA::KÍCH_HOẠT
          </p>
        </footer>
      </div>
    </div>
  );
}
