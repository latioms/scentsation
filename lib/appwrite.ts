import { Client, Account, Databases, Storage } from 'appwrite';

// Vérifier si les variables d'environnement sont définies
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!endpoint || !projectId) {
  console.error(
    'Appwrite configuration error: Missing environment variables',
    { 
      endpoint: endpoint ? 'defined' : 'missing',
      projectId: projectId ? 'defined' : 'missing',
    }
  );
}

// Créer et configurer le client
export const client = new Client();

// Tentative de configuration du client uniquement si les variables sont définies
try {
  if (endpoint && projectId) {
    client
      .setEndpoint(endpoint)
      .setProject(projectId);
    
    console.log('Appwrite client initialized successfully');
  } else {
    console.error('Appwrite client not properly initialized due to missing config');
  }
} catch (error) {
  console.error('Error initializing Appwrite client:', error);
}

export const account = new Account(client);     
export const databases = new Databases(client);
export const storage = new Storage(client);

// Fonction utilitaire pour vérifier si les services Appwrite sont correctement configurés
export function checkAppwriteConfig() {
  console.log('Appwrite Configuration Check:');
  console.log('- NEXT_PUBLIC_APPWRITE_ENDPOINT:', process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ? '✓' : '✗');
  console.log('- NEXT_PUBLIC_APPWRITE_PROJECT_ID:', process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? '✓' : '✗');
  console.log('- NEXT_PUBLIC_APPWRITE_DATABASE_ID:', process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ? '✓' : '✗');
  console.log('- NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID:', process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID ? '✓' : '✗');
  console.log('- NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID:', process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID ? '✓' : '✗');
  console.log('- NEXT_PUBLIC_APPWRITE_STORAGE_ID:', process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID ? '✓' : '✗');
  
  return {
    client: !!endpoint && !!projectId,
    database: !!process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    products: !!process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID,
    categories: !!process.env.NEXT_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID,
    storage: !!process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
  };
}

// Debug mode
if (typeof window !== 'undefined' && process.env.DEBUG === 'true') {
  console.log('Appwrite Debug Mode Enabled');
  checkAppwriteConfig();
}


