import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Sparkles, Target, ThumbsUp, X } from 'lucide-react';
import { useSubmission } from '@/contexts/SubmissionContext';

const celebrationConfig = {
  excellent: {
    title: 'Xuất sắc!',
    message: 'Điểm số tuyệt vời! Bạn đã làm rất tốt!',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-50',
    borderColor: 'border-yellow-200',
    confettiColors: ['#FFD700', '#FFA500', '#FF6347', '#32CD32', '#1E90FF'],
    emoji: '🏆'
  },
  good: {
    title: 'Tốt lắm!',
    message: 'Điểm số khá tốt! Tiếp tục phát huy!',
    icon: Star,
    color: 'text-blue-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    confettiColors: ['#1E90FF', '#00CED1', '#32CD32', '#FFD700'],
    emoji: '⭐'
  },
  average: {
    title: 'Khá tốt!',
    message: 'Điểm số ổn! Hãy cố gắng hơn nữa!',
    icon: Target,
    color: 'text-orange-500',
    bgColor: 'bg-gradient-to-br from-orange-50 to-yellow-50',
    borderColor: 'border-orange-200',
    confettiColors: ['#FFA500', '#FFD700', '#32CD32'],
    emoji: '🎯'
  },
  needs_improvement: {
    title: 'Cố gắng lên!',
    message: 'Đừng nản lòng! Lần sau sẽ tốt hơn!',
    icon: ThumbsUp,
    color: 'text-green-500',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    confettiColors: ['#32CD32', '#00CED1'],
    emoji: '👍'
  }
};

// Confetti component
function Confetti({ colors }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: `${Math.random() * 100}%`,
            top: '-10px'
          }}
          initial={{ y: -10, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            opacity: 0
          }}
          transition={{
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}

// Floating particles component
function FloatingParticles({ icon: Icon, color }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`
          }}
          initial={{ scale: 0, rotate: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            rotate: 360,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2
          }}
        >
          <Icon className="w-6 h-6" />
        </motion.div>
      ))}
    </div>
  );
}

export function CelebrationModal() {
  const { showCelebration, celebrationData, hideCelebration } = useSubmission();

  useEffect(() => {
    if (showCelebration) {
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        hideCelebration();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showCelebration, hideCelebration]);

  if (!showCelebration || !celebrationData) {
    return null;
  }

  const config = celebrationConfig[celebrationData.type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <Dialog open={showCelebration} onOpenChange={hideCelebration}>
        <DialogContent className={`
          max-w-md mx-auto p-0 border-2 ${config.borderColor} ${config.bgColor}
          overflow-hidden relative
        `}>
          {/* Confetti */}
          <Confetti colors={config.confettiColors} />
          
          {/* Floating particles */}
          <FloatingParticles icon={Sparkles} color={config.color} />

          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={hideCelebration}
            className="absolute top-2 right-2 z-10 hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Content */}
          <div className="relative z-10 p-8 text-center">
            {/* Main icon with animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: 'spring', 
                stiffness: 200, 
                damping: 10,
                delay: 0.2 
              }}
              className="mb-6"
            >
              <div className={`
                w-20 h-20 mx-auto rounded-full flex items-center justify-center
                bg-white shadow-lg ${config.color}
              `}>
                <Icon className="w-10 h-10" />
              </div>
            </motion.div>

            {/* Emoji */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-4xl mb-4"
            >
              {config.emoji}
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-3xl font-bold mb-2 text-gray-800"
            >
              {config.title}
            </motion.h2>

            {/* Name */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-xl font-semibold mb-2 text-gray-700"
            >
              {celebrationData.name}
            </motion.p>

            {/* Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="mb-4"
            >
              <div className={`
                inline-block px-6 py-3 rounded-full text-2xl font-bold
                bg-white shadow-md ${config.color}
              `}>
                {celebrationData.score} điểm
              </div>
            </motion.div>

            {/* Message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="text-gray-600 mb-6 text-lg"
            >
              {config.message}
            </motion.p>

            {/* Action button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <Button
                onClick={hideCelebration}
                className="bg-white text-gray-800 hover:bg-gray-50 shadow-md"
              >
                Tiếp tục
              </Button>
            </motion.div>
          </div>

          {/* Background animation */}
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className={`w-full h-full ${config.color}`}>
              <Icon className="w-full h-full" />
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
}

