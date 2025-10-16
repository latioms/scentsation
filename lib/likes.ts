// Gestion des likes via cookies

const LIKES_COOKIE_NAME = 'user_liked_products';

/**
 * Récupère la liste des produits likés depuis les cookies
 */
export function getLikedProducts(): string[] {
  if (typeof window === 'undefined') return [];
  
  const cookies = document.cookie.split('; ');
  const likesCookie = cookies.find(c => c.startsWith(LIKES_COOKIE_NAME + '='));
  
  if (!likesCookie) return [];
  
  try {
    const value = likesCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return [];
  }
}

/**
 * Vérifie si un produit est liké
 */
export function isProductLiked(productId: string): boolean {
  const likedProducts = getLikedProducts();
  return likedProducts.includes(productId);
}

/**
 * Ajoute un produit aux likes
 */
export function addLikedProduct(productId: string): void {
  const likedProducts = getLikedProducts();
  
  if (!likedProducts.includes(productId)) {
    likedProducts.push(productId);
    saveLikedProducts(likedProducts);
  }
}

/**
 * Retire un produit des likes
 */
export function removeLikedProduct(productId: string): void {
  const likedProducts = getLikedProducts();
  const filtered = likedProducts.filter(id => id !== productId);
  saveLikedProducts(filtered);
}

/**
 * Sauvegarde la liste des produits likés dans les cookies
 */
function saveLikedProducts(productIds: string[]): void {
  const value = encodeURIComponent(JSON.stringify(productIds));
  // Cookie valable 1 an
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${LIKES_COOKIE_NAME}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  
  // Émettre un événement personnalisé pour notifier les autres composants
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('likesChanged', { detail: { productIds } }));
  }
}

/**
 * Toggle le like d'un produit
 */
export function toggleProductLike(productId: string): boolean {
  const isLiked = isProductLiked(productId);
  
  if (isLiked) {
    removeLikedProduct(productId);
    return false;
  } else {
    addLikedProduct(productId);
    return true;
  }
}
