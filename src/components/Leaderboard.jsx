import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Play, Pause, Trophy, Medal, Award, Clock, Target } from 'lucide-react';
import { useSubmission } from '@/contexts/SubmissionContext';

export function Leaderboard() {
  const { submissions, loading } = useSubmission();
  const [playingAudio, setPlayingAudio] = useState(null);

  // Memoized sorted submissions
  const sortedSubmissions = useMemo(() => {
    return [...submissions].sort((a, b) => {
      // Sort by score (desc) then by time (asc)
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.time - b.time;
    });
  }, [submissions]);

  // Get rank icon
  const getRankIcon = useCallback((rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">#{rank}</span>;
    }
  }, []);

  // Get rank badge variant
  const getRankBadgeVariant = useCallback((rank) => {
    switch (rank) {
      case 1:
        return 'default';
      case 2:
        return 'secondary';
      case 3:
        return 'outline';
      default:
        return 'outline';
    }
  }, []);

  // Get score color
  const getScoreColor = useCallback((score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  }, []);

  // Format time display
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Format timestamp
  const formatTimestamp = useCallback((timestamp) => {
    return new Date(timestamp).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  // Handle audio playback
  const handlePlayAudio = useCallback((submissionId, audioUrl) => {
    if (playingAudio === submissionId) {
      // Stop current audio
      setPlayingAudio(null);
      return;
    }

    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onended = () => setPlayingAudio(null);
      audio.play();
      setPlayingAudio(submissionId);
    }
  }, [playingAudio]);

  // Get initials for avatar
  const getInitials = useCallback((name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Bảng Xếp Hạng
          </CardTitle>
          <CardDescription className="text-center">
            Đang tải dữ liệu...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (submissions.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Bảng Xếp Hạng
          </CardTitle>
          <CardDescription className="text-center">
            Chưa có bài nộp nào
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              Hãy là người đầu tiên nộp bài!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          Bảng Xếp Hạng
        </CardTitle>
        <CardDescription className="text-center">
          Xếp hạng theo điểm số và thời gian hoàn thành
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {sortedSubmissions.map((submission, index) => {
            const rank = index + 1;
            const isTop1 = rank === 1;
            
            return (
              <div
                key={submission.id}
                className={`
                  relative p-4 border rounded-lg transition-all duration-300 hover:shadow-md
                  ${isTop1 ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200 shadow-lg' : 'bg-white hover:bg-gray-50'}
                `}
              >
                {/* Top 1 special effect */}
                {isTop1 && (
                  <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 rounded-lg opacity-20 animate-pulse"></div>
                )}
                
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Rank */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    {getRankIcon(rank)}
                    <Badge variant={getRankBadgeVariant(rank)} className="text-xs">
                      #{rank}
                    </Badge>
                  </div>

                  {/* Avatar */}
                  <Avatar className={`w-12 h-12 flex-shrink-0 ${isTop1 ? 'ring-2 ring-yellow-400 animate-glow' : ''}`}>
                    <AvatarFallback className={`font-bold ${isTop1 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100'}`}>
                      {getInitials(submission.name)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <h3 className={`font-semibold truncate ${isTop1 ? 'text-yellow-800' : 'text-gray-900'}`}>
                        {submission.name}
                      </h3>
                      {isTop1 && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full font-medium animate-float">
                          🏆 Quán quân
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span className="hidden sm:inline">{formatTimestamp(submission.timestamp)}</span>
                        <span className="sm:hidden">{new Date(submission.timestamp).toLocaleDateString('vi-VN')}</span>
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-row sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                    {/* Score */}
                    <div className="text-center flex-1 sm:flex-none">
                      <div className="flex items-center gap-1 mb-1 justify-center">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Điểm</span>
                      </div>
                      <div className={`text-xl font-bold ${getScoreColor(submission.score)}`}>
                        {submission.score}
                      </div>
                    </div>

                    {/* Time */}
                    <div className="text-center flex-1 sm:flex-none">
                      <div className="flex items-center gap-1 mb-1 justify-center">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Thời gian</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-700">
                        {formatTime(submission.time)}
                      </div>
                    </div>

                    {/* Audio */}
                    {submission.audioUrl && (
                      <div className="text-center flex-1 sm:flex-none">
                        <div className="flex items-center gap-1 mb-1 justify-center">
                          <span className="text-xs text-gray-500">Ghi âm</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePlayAudio(submission.id, submission.audioUrl)}
                          className="flex items-center gap-1 hover-scale"
                        >
                          {playingAudio === submission.id ? (
                            <Pause className="w-3 h-3" />
                          ) : (
                            <Play className="w-3 h-3" />
                          )}
                          <span className="hidden sm:inline">{playingAudio === submission.id ? 'Dừng' : 'Phát'}</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-center gap-8 text-sm text-gray-600">
            <span>Tổng số bài nộp: <strong>{submissions.length}</strong></span>
            <span>Điểm cao nhất: <strong className={getScoreColor(Math.max(...submissions.map(s => s.score)))}>{Math.max(...submissions.map(s => s.score))}</strong></span>
            <span>Thời gian nhanh nhất: <strong>{formatTime(Math.min(...submissions.map(s => s.time)))}</strong></span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

