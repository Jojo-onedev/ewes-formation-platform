# Guide de Déploiement EWES - Supabase + Vercel

## 🚀 Déploiement en 3 étapes simples

### 1. Configuration Supabase (Base de données)

#### A. Créer un compte Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte gratuit
3. Créez un nouveau projet
4. Notez votre **Project URL** et **anon key**

#### B. Créer la table formations
1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Copiez-collez le contenu du fichier `scripts/create-tables.sql`
3. Cliquez sur **Run** pour exécuter le script
4. Vérifiez que la table `formations` est créée avec les données d'exemple

### 2. Configuration des variables d'environnement

#### A. Créer le fichier .env.local
\`\`\`bash
# Dans votre projet local
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
\`\`\`

#### B. Tester en local
\`\`\`bash
npm install
npm run dev
\`\`\`

### 3. Déploiement sur Vercel

#### A. Via GitHub (Recommandé)
1. Poussez votre code sur GitHub
2. Connectez-vous sur [vercel.com](https://vercel.com)
3. Importez votre repository GitHub
4. Ajoutez les variables d'environnement :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Cliquez sur **Deploy**

#### B. Via CLI Vercel
\`\`\`bash
npm install -g vercel
vercel
# Suivez les instructions
# Ajoutez les variables d'environnement quand demandé
\`\`\`

## ✅ Vérifications post-déploiement

1. **Site accessible** : Votre site est en ligne
2. **Formations visibles** : Les formations d'exemple s'affichent
3. **Admin fonctionnel** : `/admin` avec mot de passe `Ewesadmintab56`
4. **CRUD opérationnel** : Ajout/modification/suppression de formations

## 🔧 Avantages de cette architecture

- **Gratuit** : Supabase (500MB) + Vercel (hobby plan)
- **Scalable** : Peut gérer des milliers d'utilisateurs
- **Sécurisé** : Base de données PostgreSQL sécurisée
- **Temps réel** : Mises à jour automatiques
- **Backup automatique** : Supabase sauvegarde vos données
- **SSL inclus** : HTTPS automatique

## 📞 Support

En cas de problème :
1. Vérifiez les logs Vercel
2. Vérifiez les logs Supabase
3. Contactez le support si nécessaire

Votre site EWES sera en ligne en moins de 30 minutes ! 🚀
