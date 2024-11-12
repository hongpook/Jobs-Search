import React, { useEffect, useRef } from 'react';
import { getDocument } from 'pdfjs-dist';

const PdfViewer = ({ pdfUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        // Tải tài liệu PDF từ URL
        const pdf = await getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1); // Lấy trang đầu tiên

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Tính toán tỷ lệ để hiển thị PDF
        const scale = 1.5;
        const viewport = page.getViewport({ scale: scale });

        // Cài đặt kích thước cho canvas
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render trang PDF lên canvas
        page.render({
          canvasContext: context,
          viewport: viewport
        });
      } catch (error) {
        console.error('Không thể tải PDF:', error);
      }
    };

    fetchPdf();
  }, [pdfUrl]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PdfViewer;
