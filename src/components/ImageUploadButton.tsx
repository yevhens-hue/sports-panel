'use client';
import { useState, useRef } from 'react';

interface ImageUploadButtonProps {
  label: string;
  icon: string;
  currentUrl?: string | null;
  onUploadSuccess: (url: string) => void;
  width?: number;
  height?: number;
}

export default function ImageUploadButton({ label, icon, currentUrl, onUploadSuccess, width = 120, height = 120 }: ImageUploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`/api/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const blob = await response.json();
      onUploadSuccess(blob.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Ошибка загрузки. Проверьте VERCEL_BLOB_TOKEN');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div>
      <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--heading-color)' }}>{label}</p>
      <div 
        onClick={() => fileInputRef.current?.click()}
        style={{
          width, height, borderRadius: 10, background: '#e5e7eb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: isUploading ? 'not-allowed' : 'pointer', position: 'relative', overflow: 'hidden',
          backgroundImage: currentUrl ? `url(${currentUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!currentUrl && !isUploading && (
          <i className={`bi ${icon}`} style={{ fontSize: width / 2, color: '#9ca3af' }}></i>
        )}
        
        {isUploading && (
          <div className="spinner-border text-primary" role="status" style={{ width: '2rem', height: '2rem' }}></div>
        )}

        {!isUploading && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: '6px', color: 'white', fontSize: 16,
            opacity: currentUrl ? 0 : 1, transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = currentUrl ? '0' : '1')}
          >
            <i className="bi bi-camera-fill me-2"></i> {currentUrl ? 'Изменить' : 'Загрузить'}
          </div>
        )}
      </div>
      <input 
        type="file" 
        accept="image/*" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
      />
    </div>
  );
}
