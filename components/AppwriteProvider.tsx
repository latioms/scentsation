"use client";

import { useEffect, useState } from 'react';
import { checkAppwriteConfig } from '@/lib/appwrite';

export default function AppwriteProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isConfigValid, setIsConfigValid] = useState<boolean | null>(null);
  const [configDetails, setConfigDetails] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Vérifier la configuration Appwrite
    try {
      const config = checkAppwriteConfig();
      setConfigDetails(config);
      
      // La configuration est valide si tous les éléments nécessaires sont présents
      const isValid = config.client && config.database && 
                     (config.products || config.categories);
      
      setIsConfigValid(isValid);
      
      console.log('Appwrite configuration status:', isValid ? 'Valid' : 'Invalid');
    } catch (error) {
      console.error('Error checking Appwrite config:', error);
      setIsConfigValid(false);
    }
  }, []);

  // On ne montre pas de message en production
  if (process.env.NODE_ENV === 'production') {
    return <>{children}</>;
  }

  // En développement, on peut montrer un indicateur de statut (uniquement en dev)
  return (
    <>
      {isConfigValid === false && (
        <div className="fixed bottom-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded shadow-lg text-sm">
          ⚠️ Appwrite configuration incomplète
        </div>
      )}
      {children}
    </>
  );
}