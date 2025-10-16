'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isProductLiked, toggleProductLike } from '@/lib/likes';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface LikeButtonProps {
  productId: string;
  onLikeChange?: (isLiked: boolean) => void;
  className?: string;
  iconClassName?: string;
  showCount?: boolean;
  initialCount?: number;
  requireAuth?: boolean; // Nouveau prop pour exiger l'authentification
}

export default function LikeButton({
  productId,
  onLikeChange,
  className,
  iconClassName,
  showCount = false,
  initialCount = 0,
  requireAuth = true // Par défaut, l'auth est requise
}: LikeButtonProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si le produit est liké au montage du composant
    setIsLiked(isProductLiked(productId));
    
    // Vérifier l'authentification
    checkAuthentication();
  }, [productId]);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/auth/check');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la navigation si dans un Link
    e.stopPropagation();

    if (isUpdating) return;

    // Si l'auth est requise et l'utilisateur n'est pas connecté
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
      return;
    }

    setIsUpdating(true);

    // Toggle le like localement (cookies)
    const newIsLiked = toggleProductLike(productId);
    setIsLiked(newIsLiked);

    // Optimistic UI update
    setLikeCount(prev => newIsLiked ? prev + 1 : Math.max(0, prev - 1));

    // Mettre à jour dans la base de données
    try {
      const response = await fetch(`/api/products/${productId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ increment: newIsLiked }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && typeof data.likes === 'number') {
          setLikeCount(data.likes);
        }
      } else {
        // Rollback en cas d'erreur
        const rollbackLiked = toggleProductLike(productId);
        setIsLiked(rollbackLiked);
        setLikeCount(prev => rollbackLiked ? prev + 1 : Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Erreur lors du like:', error);
      // Rollback en cas d'erreur
      const rollbackLiked = toggleProductLike(productId);
      setIsLiked(rollbackLiked);
      setLikeCount(prev => rollbackLiked ? prev + 1 : Math.max(0, prev - 1));
    } finally {
      setIsUpdating(false);
      onLikeChange?.(newIsLiked);
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      disabled={isUpdating}
      className={cn(
        "transition-all duration-200 hover:scale-110",
        isUpdating && "opacity-50 cursor-not-allowed",
        className
      )}
      aria-label={isLiked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <div className="flex items-center gap-1">
        <Heart
          className={cn(
            "transition-all duration-200",
            isLiked ? 'fill-red-700 text-red-700' : 'text-gray-600',
            iconClassName
          )}
        />
        {showCount && (
          <span className="text-sm text-muted-foreground">
            {likeCount}
          </span>
        )}
      </div>
    </button>
  );
}
