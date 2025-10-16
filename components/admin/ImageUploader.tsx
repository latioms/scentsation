'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/appwrite';
import { ID } from 'appwrite';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  label?: string;
  required?: boolean;
}

export default function ImageUploader({ 
  onImageUploaded, 
  currentImage, 
  label = 'Image',
  required = false 
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(currentImage || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image valide');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB');
      return;
    }

    setError('');
    
    // Créer une prévisualisation locale
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload vers Appwrite
    setUploading(true);
    try {
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string;
      
      // Upload le fichier
      const response = await storage.createFile(
        bucketId,
        ID.unique(),
        file
      );

      // Obtenir l'URL publique
      const fileUrl = storage.getFileView(bucketId, response.$id);
      
      // Notifier le parent
      onImageUploaded(fileUrl.toString());
      
    } catch (err) {
      console.error('Upload error:', err);
      setError('Erreur lors de l\'upload de l\'image');
      setPreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        {label} {required && '*'}
      </label>

      <div className="space-y-3">
        {/* Zone de prévisualisation */}
        <div 
          className={`relative border-2 border-dashed rounded-lg overflow-hidden transition-all ${
            preview 
              ? 'border-primary bg-primary/5' 
              : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:border-primary hover:bg-primary/5'
          }`}
          style={{ aspectRatio: '1/1', maxWidth: '300px' }}
        >
          {preview ? (
            <>
              {/* Image preview */}
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay avec actions */}
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={handleClick}
                  disabled={uploading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Changer
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  disabled={uploading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Supprimer
                </Button>
              </div>

              {/* Indicateur de chargement */}
              {uploading && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-sm">Upload en cours...</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Zone de drop/click quand vide */
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className="w-full h-full flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-primary/10 transition-colors"
            >
              <svg 
                className="w-12 h-12 text-neutral-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              <div className="text-center">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Cliquez ou glissez une image
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  PNG, JPG, WebP (max 5MB)
                </p>
              </div>
            </button>
          )}
        </div>

        {/* Input file caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Message d'erreur */}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {/* Info */}
        <p className="text-xs text-neutral-500">
          L'image sera automatiquement uploadée sur Appwrite Storage
        </p>
      </div>
    </div>
  );
}
