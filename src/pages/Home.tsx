import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';
import { Play, Settings, Camera, Download } from 'lucide-react';
import Webcam from 'react-webcam';
import { Leaderboard } from '../components/Leaderboard';
import { cn } from '../lib/utils';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function Home() {
  const navigate = useNavigate();
  const { startGame, isLoading } = useGame();
  const { isInstallable, promptInstall } = usePWAInstall();
  
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [level, setLevel] = useState('all');
  const [camError, setCamError] = useState<string | null>(null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !className || isLoading) return;
    
    startGame({ name, className, level });
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] p-6 md:p-12 flex flex-col items-center relative overflow-x-hidden overflow-y-auto" style={{ fontFamily: "'Sarabun', sans-serif" }}>
      {/* Background decorations - Tinh chỉnh nhẹ nhàng chuẩn Flat Design */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#EE0033] rounded-full mix-blend-multiply filter blur-3xl opacity-5 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>

      {/* Container chính: Mở rộng max-w để full màn hình 1920 tốt hơn */}
      <div className="w-full max-w-[92%] mt-8 grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 relative z-10">
        
        {/* Left Side: Game Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 md:p-16 rounded-[3rem] shadow-[0_15px_50px_rgba(0,0,0,0.08)] border-2 border-slate-100 self-start"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-8xl font-black text-[#EE0033] mb-6 tracking-tighter">
              SỬ VIỆT KỲ THÚ
            </h1>
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="h-px w-12 bg-slate-200"></span>
              <p className="text-slate-500 font-bold text-lg uppercase tracking-[0.2em]">Điều khiển bằng cử chỉ tay 🖐️</p>
              <span className="h-px w-12 bg-slate-200"></span>
            </div>
          </div>

          <div className="mb-12 flex flex-col items-center">
            <div className="w-36 h-36 rounded-full overflow-hidden border-8 border-slate-50 shadow-2xl bg-slate-200 relative flex items-center justify-center">
              <Webcam 
                audio={false} 
                mirrored={true} 
                muted={true}
                playsInline={true}
                className="w-full h-full object-cover" 
                videoConstraints={{ facingMode: "user" }}
                onUserMediaError={(err: any) => setCamError(err?.message || err?.name || "Lỗi")}
              />
              {camError ? (
                <div className="absolute inset-0 bg-red-50 flex items-center justify-center p-4 text-center">
                  <span className="text-red-600 text-xs font-black uppercase">Lỗi Camera</span>
                </div>
              ) : (
                <div className="absolute bottom-3 left-0 right-0 text-center">
                  <span className="bg-black/80 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">
                    LIVE PREVIEW
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm text-slate-400 font-bold mt-6 text-center uppercase tracking-wide">
              {camError ? "Vui lòng cấp quyền Camera để bắt đầu" : "Hãy sẵn sàng vận động cùng lịch sử"}
            </p>
          </div>

          <form onSubmit={handleStart} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Họ và Tên</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-8 py-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#EE0033] transition-all outline-none font-bold text-2xl text-slate-700 shadow-inner"
                  placeholder="Học sinh..."
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Lớp học</label>
                <input 
                  type="text" 
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full px-8 py-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#EE0033] transition-all outline-none font-bold text-2xl text-slate-700 shadow-inner"
                  placeholder="Ví dụ: 5A1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-400 mb-3 uppercase tracking-[0.2em]">Cấp độ thử thách</label>
              <select 
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-8 py-6 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-[#EE0033] transition-all outline-none font-bold text-2xl text-slate-700 appearance-none cursor-pointer shadow-inner"
              >
                <option value="all">Tất cả câu hỏi 🌍</option>
                <option value="easy">Cấp độ Dễ 🌱</option>
                <option value="medium">Cấp độ Trung bình ⚔️</option>
                <option value="hard">Cấp độ Khó 🔥</option>
              </select>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full text-white font-black text-3xl py-8 rounded-3xl transition-all flex items-center justify-center gap-4 mt-12",
                isLoading 
                  ? "bg-slate-400 cursor-not-allowed" 
                  : "bg-[#EE0033] hover:bg-[#cc002c] shadow-[0_10px_0_#990021] hover:shadow-[0_5px_0_#990021] hover:translate-y-[5px] active:translate-y-[10px] active:shadow-none"
              )}
            >
              {isLoading ? "ĐANG TẢI..." : <><Play className="w-10 h-10 fill-current" /> BẮT ĐẦU VẬN ĐỘNG</>}
            </button>

            <div className="grid grid-cols-2 gap-4">
               <button 
                type="button"
                onClick={() => navigate('/admin')}
                className="py-5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-[#EE0033] rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
              >
                <Settings className="w-5 h-5" /> Quản trị
              </button>
              {isInstallable && (
                <button 
                  type="button"
                  onClick={promptInstall}
                  className="py-5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest"
                >
                  <Download className="w-5 h-5" /> Cài đặt App
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Right Side: Leaderboard */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.2 }}
           className="h-full"
        >
          <Leaderboard limit={12} />
        </motion.div>
      </div>
    </div>
  );
}