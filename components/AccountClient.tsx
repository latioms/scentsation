'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Edit2, LogOut, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAccountDetails, updateAccountName } from '@/app/actions/accountActions';
import { logout } from '@/app/actions/logout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLikedProducts } from '@/lib/likes';

export default function AccountClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    createdAt: '',
    userId: '',
  });
  const [newName, setNewName] = useState('');
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    loadAccountData();
    const likedProducts = getLikedProducts();
    setFavoritesCount(likedProducts.length);
  }, []);

  const loadAccountData = async () => {
    setLoading(true);
    const response = await getAccountDetails();
    
    if (response.success && response.data) {
      setAccountData(response.data);
      setNewName(response.data.name);
    } else {
      router.push('/login');
    }
    setLoading(false);
  };

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newName.trim() || newName === accountData.name) {
      setIsEditing(false);
      return;
    }

    setUpdating(true);
    const response = await updateAccountName(newName.trim());
    
    if (response.success) {
      setAccountData({ ...accountData, name: newName.trim() });
      setIsEditing(false);
    } else {
      alert(response.error || 'Erreur lors de la mise à jour');
      setNewName(accountData.name);
    }
    setUpdating(false);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      router.push('/login');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mon Compte
            </h1>
            <p className="text-muted-foreground text-lg">
              Gérez vos informations personnelles
            </p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Carte Informations */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Informations du compte</h2>
            
            <div className="space-y-6">
              {/* Nom */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom
                </Label>
                {isEditing ? (
                  <form onSubmit={handleUpdateName} className="flex gap-2">
                    <Input
                      id="name"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Votre nom"
                      disabled={updating}
                      autoFocus
                    />
                    <Button type="submit" disabled={updating}>
                      {updating ? 'Sauvegarde...' : 'Sauvegarder'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setNewName(accountData.name);
                      }}
                      disabled={updating}
                    >
                      Annuler
                    </Button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="text-foreground">{accountData.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <div className="p-3 bg-muted rounded-md">
                  <span className="text-foreground">{accountData.email}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  L'email ne peut pas être modifié
                </p>
              </div>

              {/* Date de création */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Membre depuis
                </Label>
                <div className="p-3 bg-muted rounded-md">
                  <span className="text-foreground">
                    {formatDate(accountData.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Carte Statistiques */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Mes statistiques</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Favoris */}
              <Link href="/favorites">
                <div className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Favoris</p>
                      <p className="text-2xl font-bold">{favoritesCount}</p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* User ID (pour debug) */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ID Utilisateur</p>
                    <p className="text-xs font-mono truncate max-w-[150px]">
                      {accountData.userId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Link href="/favorites" className="flex-1">
              <Button variant="outline" className="w-full">
                <Heart className="w-4 h-4 mr-2" />
                Voir mes favoris
              </Button>
            </Link>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="flex-1"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
