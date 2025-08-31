import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Target, ThumbsUp, X } from "lucide-react";
import { useSubmission } from "@/contexts/SubmissionContext";

const celebrationConfig = {
  excellent: {
    title: "🏆 Xuất sắc!",
    message: "Điểm số tuyệt vời! Bạn đã làm rất tốt!",
    icon: Trophy,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
  },
  good: {
    title: "⭐ Tốt lắm!",
    message: "Điểm số khá tốt! Tiếp tục phát huy!",
    icon: Star,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  average: {
    title: "🎯 Khá tốt!",
    message: "Điểm số ổn! Hãy cố gắng hơn nữa!",
    icon: Target,
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  needs_improvement: {
    title: "👍 Cố gắng lên!",
    message: "Đừng nản lòng! Lần sau sẽ tốt hơn!",
    icon: ThumbsUp,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
};

export function CelebrationModal() {
  const { showCelebration, celebrationData, hideCelebration } = useSubmission();

  // Debug logs
  console.log("CelebrationModal render:", { showCelebration, celebrationData });

  useEffect(() => {
    if (showCelebration && celebrationData) {
      console.log("Celebration should show:", celebrationData);
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        hideCelebration();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showCelebration, celebrationData, hideCelebration]);

  // Simple render condition
  if (!showCelebration || !celebrationData) {
    console.log("Not showing celebration - early return");
    return null;
  }

  const config = celebrationConfig[celebrationData.type];
  if (!config) {
    console.error("No config found for type:", celebrationData.type);
    return null;
  }

  console.log("Rendering celebration with config:", config);

  return (
    <Dialog open={showCelebration} onOpenChange={hideCelebration}>
      <DialogContent
        className={`max-w-md mx-auto p-6 ${config.bgColor} border-2 ${config.borderColor}`}
      >
        <DialogTitle className="sr-only">Thông báo kết quả nộp bài</DialogTitle>

        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={hideCelebration}
          className="absolute top-2 right-2"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Content */}
        <div className="text-center space-y-4">
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800">{config.title}</h2>

          {/* Name */}
          <p className="text-lg font-semibold text-gray-700">
            {celebrationData.name}
          </p>

          {/* Score */}
          <div className="text-3xl font-bold text-blue-600">
            {celebrationData.score} điểm
          </div>

          {/* Message */}
          <p className="text-gray-600">{config.message}</p>

          {/* Action button */}
          <Button onClick={hideCelebration} className="w-full mt-4">
            Tiếp tục
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
