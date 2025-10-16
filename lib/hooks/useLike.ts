'use client';

import { useState, useEffect } from 'react';
import { isProductLiked, toggleProductLike } from '@/lib/likes';

export function useLike(productId: string, initialCount: number = 0) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setIsLiked(isProductLiked(productId));
  }, [productId]);

  const toggleLike = async () => {
    if (isUpdating) return;

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
    }
  };

  return {
    isLiked,
    likeCount,
    isUpdating,
    toggleLike,
  };
}
