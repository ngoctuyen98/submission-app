import { useState, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mic, MicOff, Play, Pause, Trash2, Upload } from 'lucide-react';
import { useSubmission } from '@/contexts/SubmissionContext';

// Validation schema
const submissionSchema = z.object({
  name: z.string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên không được quá 50 ký tự')
    .regex(/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng'),
  score: z.number()
    .min(0, 'Điểm phải từ 0 trở lên')
    .max(100, 'Điểm không được quá 100'),
  time: z.number()
    .min(1, 'Thời gian phải lớn hơn 0')
    .max(3600, 'Thời gian không được quá 3600 giây')
});

export function SubmissionForm() {
  const { addSubmission, loading, error, clearError } = useSubmission();
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [permissionError, setPermissionError] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: '',
      score: '',
      time: ''
    }
  });

  // Request microphone permission
  const requestMicrophonePermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      setPermissionError(null);
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setPermissionError('Cần quyền truy cập microphone để ghi âm');
      return false;
    }
  }, []);

  // Start recording
  const startRecording = useCallback(async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start recording timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      setPermissionError('Không thể bắt đầu ghi âm');
    }
  }, [requestMicrophonePermission]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(recordingIntervalRef.current);
    }
  }, [isRecording]);

  // Play/pause audio
  const togglePlayback = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  // Delete recording
  const deleteRecording = useCallback(() => {
    setAudioBlob(null);
    setAudioUrl(null);
    setIsPlaying(false);
    setRecordingTime(0);
  }, []);

  // Format time display
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      clearError();
      
      const submissionData = {
        ...data,
        score: Number(data.score),
        time: Number(data.time),
        audioBlob: audioBlob,
        audioUrl: audioUrl
      };

      await addSubmission(submissionData);
      reset();
      deleteRecording();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto hover-lift animate-slide-up">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center gradient-text">
          Nộp Bài Thi
        </CardTitle>
        <CardDescription className="text-center">
          Điền thông tin và ghi âm để nộp bài
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Tên thí sinh *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Nhập tên của bạn"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Score Field */}
          <div className="space-y-2">
            <Label htmlFor="score">Điểm số *</Label>
            <Input
              id="score"
              type="number"
              min="0"
              max="100"
              step="0.1"
              {...register('score', { valueAsNumber: true })}
              placeholder="Nhập điểm (0-100)"
              className={errors.score ? 'border-red-500' : ''}
            />
            {errors.score && (
              <p className="text-sm text-red-500">{errors.score.message}</p>
            )}
          </div>

          {/* Time Field */}
          <div className="space-y-2">
            <Label htmlFor="time">Thời gian (giây) *</Label>
            <Input
              id="time"
              type="number"
              min="1"
              max="3600"
              {...register('time', { valueAsNumber: true })}
              placeholder="Nhập thời gian hoàn thành (giây)"
              className={errors.time ? 'border-red-500' : ''}
            />
            {errors.time && (
              <p className="text-sm text-red-500">{errors.time.message}</p>
            )}
          </div>

          {/* Audio Recording Section */}
          <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <Label className="text-base font-medium">Ghi âm (tùy chọn)</Label>
            
            {permissionError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">
                  {permissionError}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex items-center gap-4">
              {!isRecording && !audioBlob && (
                <Button
                  type="button"
                  onClick={startRecording}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Mic className="w-4 h-4" />
                  Bắt đầu ghi âm
                </Button>
              )}

              {isRecording && (
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    onClick={stopRecording}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <MicOff className="w-4 h-4" />
                    Dừng ghi âm
                  </Button>
                  <div className="flex items-center gap-2 text-red-600">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-recording-pulse"></div>
                    <span className="font-mono">{formatTime(recordingTime)}</span>
                  </div>
                </div>
              )}

              {audioBlob && (
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    onClick={togglePlayback}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? 'Tạm dừng' : 'Phát'}
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={deleteRecording}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </Button>
                  
                  <span className="text-sm text-gray-600">
                    Đã ghi âm ({formatTime(recordingTime)})
                  </span>
                </div>
              )}
            </div>

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                className="hidden"
              />
            )}
          </div>

          {/* Error Display */}
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || isSubmitting}
            className="w-full flex items-center gap-2"
          >
            {loading || isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang nộp bài...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Nộp bài
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

