'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/appwrite';
import { ID } from 'appwrite';

interface MultiImageUploaderProps {
  onImagesUploaded: (urls: string[]) => void;
  currentImages?: string[];
  maxImages?: number;
}

export default function MultiImageUploader({ 
  onImagesUploaded, 
  currentImages = [],
  maxImages = 4
}: MultiImageUploaderProps) {
  const [images, setImages] = useState<string[]>(currentImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Vérifier le nombre max
    if (images.length + files.length > maxImages) {
      setError(`Vous ne pouvez ajouter que ${maxImages} images maximum`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string;
      const uploadPromises = files.map(async (file) => {
        // Vérifier le type
        if (!file.type.startsWith('image/')) {
          throw new Error('Type de fichier invalide');
        }

        // Vérifier la taille
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Fichier trop volumineux');
        }

        // Upload
        const response = await storage.createFile(bucketId, ID.unique(), file);
        return storage.getFileView(bucketId, response.$id).toString();
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages = [...images, ...uploadedUrls];
      setImages(newImages);
      onImagesUploaded(newImages);

    } catch (err) {
      console.error('Upload error:', err);
      setError('Erreur lors de l\'upload des images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesUploaded(newImages);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">
        Images additionnelles (optionnel)
      </label>

      <div className="space-y-3">
        {/* Grille d'images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {/* Images existantes */}
          {images.map((url, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-lg overflow-hidden border-2 border-primary bg-primary/5 group"
            >
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay avec suppression */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(index)}
                  disabled={uploading}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>

              {/* Numéro */}
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {index + 1}
              </div>
            </div>
          ))}

          {/* Bouton d'ajout */}
          {images.length < maxImages && (
            <button
              type="button"
              onClick={handleClick}
              disabled={uploading}
              className="aspect-square rounded-lg border-2 border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <p className="text-xs text-neutral-500">Upload...</p>
                </>
              ) : (
                <>
                  <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-xs text-neutral-500 px-2 text-center">
                    Ajouter<br />une image
                  </p>
                </>
              )}
            </button>
          )}
        </div>

        {/* Input file caché */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelect}
          className="hidden"
        />

        {/* Message d'erreur */}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {/* Info */}
        <div className="flex items-start gap-2 text-xs text-neutral-500">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p>• Max {maxImages} images ({images.length}/{maxImages})</p>
            <p>• PNG, JPG, WebP (max 5MB chacune)</p>
            <p>• Les images sont uploadées automatiquement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
