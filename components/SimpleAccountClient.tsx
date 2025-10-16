'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Calendar, LogOut, UserCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/actions/logout';
import { useRouter } from 'next/navigation';
import { SignupForm } from '@/components/SignupForm';
import { LoginForm } from '@/components/LoginForm';
import { registerUser, loginUser } from '@/app/actions/authActions';

interface SessionData {
  user: {
    userId: string;
    email: string;
    name: string;
    createdAt: string;
    ip: string;
    countryName: string;
  };
}

interface SimpleAccountClientProps {
  session: SessionData | null;
}

export default function SimpleAccountClient({ session }: SimpleAccountClientProps) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [clientIP, setClientIP] = useState<string>('N/A');

  // Récupérer l'IP du client côté navigateur
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setClientIP(data.ip))
      .catch(() => setClientIP('Indisponible'));
  }, []);

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      router.push('/');
      router.refresh();
    }
  };

  const handleSignup = async (data: { name: string; email: string; password: string }) => {
    setLoading(true);
    const result = await registerUser(data);
    
    if (result.success) {
      router.refresh(); // Recharger la page pour récupérer la nouvelle session
    } else {
      alert(result.error || 'Erreur lors de la création du compte');
    }
    setLoading(false);
  };

  const handleLogin = async (data: { email: string; password: string }) => {
    setLoading(true);
    const result = await loginUser(data);
    
    if (result.success) {
      router.refresh(); // Recharger la page pour récupérer la nouvelle session
    } else {
      alert(result.error || 'Erreur lors de la connexion');
    }
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Date inconnue';
    }
  };

  // Si pas de session, afficher les formulaires de connexion/inscription
  if (!session) {
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
                {isLogin ? 'Connexion' : 'Créer un compte'}
              </h1>
              <p className="text-muted-foreground text-lg">
                {isLogin 
                  ? 'Connectez-vous à votre compte' 
                  : 'Rejoignez Scentsation aujourd\'hui'}
              </p>
            </div>
          </div>
        </div>

        {/* Formulaires */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            {isLogin ? (
              <LoginForm
                onSubmit={handleLogin}
                onSwitchToSignup={() => setIsLogin(false)}
                loading={loading}
              />
            ) : (
              <SignupForm
                onSubmit={handleSignup}
                onSwitchToLogin={() => setIsLogin(true)}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Si session existante, afficher les informations du compte
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
              Bonjour, {session.user.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              Vos informations de compte
            </p>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Carte Informations personnelles */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <UserCheck className="w-5 h-5" />
              Informations personnelles
            </h2>
            
            <div className="space-y-4">
              {/* Nom */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nom</p>
                    <p className="font-medium">{session.user.name}</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{session.user.email}</p>
                  </div>
                </div>
              </div>

              {/* Date de création */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Membre depuis</p>
                    <p className="font-medium">{formatDate(session.user.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Carte Informations de connexion */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Informations de connexion
            </h2>
            
            <div className="space-y-4">
              {/* IP actuelle */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Adresse IP</p>
                    <p className="font-medium font-mono">{clientIP}</p>
                  </div>
                </div>
              </div>

              {/* ID Utilisateur */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">ID Utilisateur</p>
                    <p className="font-medium font-mono text-sm">{session.user.userId}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
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