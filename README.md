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

### 🎉 Modal Chúc Mừng

- **Phản hồi thông minh**: Dựa trên điểm số để hiển thị thông báo phù hợp
- **4 cấp độ**: Xuất sắc (80-100), Tốt lắm (60-79), Khá tốt (40-59), Cố gắng lên (<40)
- **Tự động đóng**: Modal tự đóng sau 5 giây
- **Thiết kế đẹp**: Icon và màu sắc theo từng cấp độ

### 📱 Responsive Design

- **Mobile-first**: Tối ưu cho điện thoại
- **Adaptive layout**: Tự động điều chỉnh theo kích thước màn hình
- **Touch-friendly**: Các nút và tương tác thân thiện với touch

### ⚡ Tối Ưu Hiệu Suất

- **React Hooks**: useMemo, useCallback để tối ưu render
- **Context API**: Quản lý state toàn cục hiệu quả
- **Error Boundaries**: Xử lý lỗi một cách graceful

## 🛠️ Công nghệ sử dụng

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.1.7
- **UI Components**: shadcn/ui + Radix UI
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
git clone https://github.com/ngoctuyen98/submission-app.git
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
│   └── favicon.ico
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── CelebrationModal.jsx  # Modal chúc mừng
│   │   ├── ErrorBoundary.jsx     # Error handling
│   │   ├── Leaderboard.jsx       # Bảng xếp hạng
│   │   └── SubmissionForm.jsx    # Form nộp bài
│   ├── contexts/          # React contexts
│   │   └── SubmissionContext.jsx
│   ├── hooks/             # Custom hooks
│   │   └── use-mobile.js
│   ├── lib/               # Utility libraries
│   │   └── utils.js
│   ├── assets/            # Images, icons
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── components.json         # shadcn/ui config
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
├── .gitignore             # Git ignore rules
└── package.json           # Dependencies
```

## ✨ Cách sử dụng

1. **Nộp bài**: Điền tên và điểm số (0-100), click "Nộp bài"
2. **Xem kết quả**: Modal chúc mừng sẽ hiện với thông báo phù hợp
3. **Bảng xếp hạng**: Xem danh sách điểm cao được lưu trong localStorage
4. **Responsive**: Ứng dụng hoạt động tốt trên mọi thiết bị

## 🎨 Customization

### Thay đổi cấu hình chúc mừng

Chỉnh sửa `celebrationConfig` trong `CelebrationModal.jsx`:

```javascript
const celebrationConfig = {
  excellent: {
    title: "🏆 Xuất sắc!",
    message: "Điểm số tuyệt vời! Bạn đã làm rất tốt!",
    // ... other configs
  },
  // ... other levels
};
```

### Thêm UI components

Sử dụng shadcn/ui để thêm components:

```bash
npx shadcn@latest add [component-name]
```

## 🔧 Cấu hình

### Environment Variables

Tạo file `.env.local` nếu cần:

```env
VITE_API_URL=your_api_url_here
VITE_APP_TITLE=Submission App
```

## 🐛 Troubleshooting

### Lỗi cài đặt dependencies

```bash
# Xóa cache và cài đặt lại
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Lỗi build

```bash
# Kiểm tra linting
pnpm lint

# Clear cache và build lại
rm -rf dist
pnpm build
```

### Modal không hiển thị

Kiểm tra console logs trong `CelebrationModal.jsx` để debug state.

## 🚀 Demo

Ứng dụng đã được deploy tại: [Link Demo](https://submission-app.vercel.app/) _(coming soon)_

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phân phối dưới MIT License.

## 📞 Liên hệ

- **GitHub**: [@ngoctuyen98](https://github.com/ngoctuyen98)
- **Email**: ngoctuyen98@example.com

---

**Chúc bạn coding vui vẻ! 🚀**
