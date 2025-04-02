export const metadata = {
  title: "Attendance System",
  description: "Face recognition attendance system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
