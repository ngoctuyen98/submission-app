import { SubmissionProvider } from '@/contexts/SubmissionContext';
import { SubmissionForm } from '@/components/SubmissionForm';
import { Leaderboard } from '@/components/Leaderboard';
import { CelebrationModal } from '@/components/CelebrationModal';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trophy, FileText, Users } from 'lucide-react';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <SubmissionProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Ứng dụng Nộp Bài Thi
              </h1>
              <p className="text-lg text-gray-600">
                Nộp bài và xem bảng xếp hạng theo thời gian thực
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Features Overview */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Nộp Bài Dễ Dàng</h3>
                    <p className="text-sm text-gray-600">Điền thông tin và ghi âm nhanh chóng</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Xếp Hạng Thời Gian Thực</h3>
                    <p className="text-sm text-gray-600">Theo dõi thứ hạng ngay lập tức</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">Cộng Đồng Học Tập</h3>
                    <p className="text-sm text-gray-600">Cùng nhau tiến bộ và cạnh tranh lành mạnh</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submission Form */}
            <section>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Nộp Bài Thi
                </h2>
                <p className="text-gray-600">
                  Điền đầy đủ thông tin và ghi âm để nộp bài
                </p>
              </div>
              <SubmissionForm />
            </section>

            <Separator className="my-8" />

            {/* Leaderboard */}
            <section>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Bảng Xếp Hạng
                </h2>
                <p className="text-gray-600">
                  Xếp hạng theo điểm số cao nhất và thời gian hoàn thành nhanh nhất
                </p>
              </div>
              <Leaderboard />
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 border-t mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600">
              <p className="mb-2">
                © 2025 Ứng dụng Nộp Bài Thi. Được xây dựng với React và Tailwind CSS.
              </p>
              <p className="text-sm">
                Hỗ trợ ghi âm, validation chi tiết và xếp hạng thời gian thực.
              </p>
            </div>
          </div>
        </footer>

        {/* Celebration Modal */}
        <CelebrationModal />
      </div>
      </SubmissionProvider>
    </ErrorBoundary>
  );
}

export default App;

