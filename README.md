# Ứng dụng Nộp Bài Thi - Submission App

Một ứng dụng React đầy đủ tính năng để mô phỏng quá trình nộp bài thi với form submission, bảng xếp hạng, ghi âm và hiệu ứng chúc mừng.

## 🚀 Tính năng chính

### ✅ Form Nộp Bài

- **Validation chi tiết**: Sử dụng React Hook Form + Zod
- **Các trường bắt buộc**: Tên thí sinh, Điểm số (0-100), Thời gian (giây)
- **Ghi âm tùy chọn**: Hỗ trợ ghi âm và phát lại
- **Xử lý lỗi chuyên nghiệp**: Error boundaries và thông báo lỗi rõ ràng

### 🏆 Bảng Xếp Hạng

- **Xếp hạng thông minh**: Theo điểm cao nhất, thời gian nhanh nhất
- **Hiệu ứng đặc biệt**: Top 1 có hiệu ứng vàng và badge "Quán quân"
- **Loading state**: Mô phỏng API call với skeleton loading
- **Lưu trữ dữ liệu**: Sử dụng localStorage để persist data

### 📱 Responsive Design

- **Mobile-first**: Tối ưu cho điện thoại
- **Adaptive layout**: Tự động điều chỉnh theo kích thước màn hình
- **Touch-friendly**: Các nút và tương tác thân thiện với touch

### ⚡ Tối Ưu Hiệu Suất

- **React Hooks**: useMemo, useCallback để tối ưu render
- **Context API**: Quản lý state toàn cục hiệu quả
- **useReducer**: Xử lý state phức tạp một cách có tổ chức

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion 12.15.0
- **Form Handling**: React Hook Form 7.56.3
- **Validation**: Zod 3.24.4
- **Package Manager**: pnpm

## 📦 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js >= 18.0.0
- pnpm (khuyến nghị) hoặc npm/yarn

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd submission-app
```

### Bước 2: Cài đặt dependencies

```bash
# Sử dụng pnpm (khuyến nghị)
pnpm install

# Hoặc sử dụng npm
npm install

# Hoặc sử dụng yarn
yarn install
```

## 🚀 Chạy ứng dụng

### Chế độ phát triển (Development)

```bash
# Sử dụng pnpm
pnpm dev

# Hoặc sử dụng npm
npm run dev

# Hoặc sử dụng yarn
yarn dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Build cho production

```bash
# Build ứng dụng
pnpm build

# Preview build
pnpm preview
```

### Kiểm tra code (Linting)

```bash
pnpm lint
```

## 📁 Cấu trúc thư mục

```
submission-app/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── CelebrationModal.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Leaderboard.jsx
│   │   └── SubmissionForm.jsx
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility libraries
│   ├── assets/            # Images, icons
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── components.json         # shadcn/ui config
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
└── package.json           # Dependencies
```
