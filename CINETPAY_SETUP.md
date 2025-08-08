# 🇨🇮 Configuration CinetPay pour EWES

## Pourquoi CinetPay ?

✅ **🇨🇮 Basé en Côte d'Ivoire** - Support local en français  
✅ **🇧🇫 Très populaire au Burkina Faso** - Confiance client  
✅ **📱 Tous les Mobile Money** - Orange, Moov, MTN, Wave  
✅ **💳 Cartes bancaires** internationales  
✅ **🔧 API simple** et bien documentée  
✅ **💰 Frais compétitifs** (2-3%)  
✅ **⚡ Paiement instantané**

## 📋 Étapes de configuration

### 1. Créer un compte CinetPay

1. Allez sur [cinetpay.com](https://cinetpay.com)
2. Cliquez sur **"Créer un compte"**
3. Remplissez vos informations :
   - **Nom de l'entreprise** : EWES Formation
   - **Secteur** : Éducation/Formation
   - **Pays** : Burkina Faso
   - **Téléphone** : +226 56 63 03 58
   - **Email** : contact@ewes-formation.com

### 2. Vérification du compte

1. **Vérifiez votre email** (lien de confirmation)
2. **Ajoutez vos documents** :
   - Pièce d'identité du dirigeant
   - Justificatif d'entreprise (RCCM si disponible)
   - RIB ou relevé bancaire
3. **Attendez la validation** (24-48h généralement)

### 3. Récupérer les clés API

Une fois votre compte validé :

1. Connectez-vous à votre **Dashboard CinetPay**
2. Allez dans **"Paramètres" > "API & Webhooks"**
3. Notez vos clés :
   - **API Key** (Clé publique)
   - **Site ID** (Identifiant du site)
   - **Secret Key** (Clé secrète - CONFIDENTIELLE)

### 4. Configuration dans votre projet

Ajoutez dans votre fichier `.env.local` :

\`\`\`bash
CINETPAY_API_KEY=votre_api_key
CINETPAY_SITE_ID=votre_site_id
CINETPAY_SECRET_KEY=votre_secret_key
CINETPAY_MODE=test
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### 5. Test en mode Sandbox

1. **Mode test** : `CINETPAY_MODE=test`
2. **Testez un paiement** avec les numéros de test CinetPay
3. **Vérifiez** que tout fonctionne

### 6. Passage en production

1. **Changez** : `CINETPAY_MODE=live`
2. **Mettez à jour** : `NEXT_PUBLIC_SITE_URL=https://votre-domaine.com`
3. **Testez** avec un vrai paiement de faible montant

## 💳 Moyens de paiement CinetPay

### 📱 **Mobile Money par pays :**

#### 🇧🇫 **Burkina Faso**
- **Orange Money** - Le plus populaire
- **Moov Money** - Très utilisé

#### 🇨🇮 **Côte d'Ivoire**
- **Orange Money** - Leader
- **MTN Money** - Populaire
- **Moov Money** - Bien accepté

#### 🇸🇳 **Sénégal**
- **Orange Money** - Dominant
- **Free Money** - En croissance
- **Wave** - Très moderne

#### 🇲🇱 **Mali**
- **Orange Money** - Principal
- **Moov Money** - Alternative

### 💳 **Cartes bancaires**
- **Visa** - Toutes cartes
- **Mastercard** - Toutes cartes
- **Cartes locales** - BCEAO, etc.

## 🔧 Fonctionnalités CinetPay

✅ **Interface en français** - Parfait pour vos clients  
✅ **Détection automatique** du pays et opérateur  
✅ **Conversion de devise** automatique  
✅ **Webhooks temps réel** - Notifications instantanées  
✅ **Dashboard complet** - Suivi des transactions  
✅ **Support local** - Équipe basée en Côte d'Ivoire  
✅ **Documentation française** - Facile à comprendre

## 📞 Support CinetPay

### **🇨🇮 Côte d'Ivoire (Siège)**
- **Téléphone** : +225 05 04 04 04 04
- **WhatsApp** : +225 05 04 04 04 04
- **Email** : support@cinetpay.com
- **Adresse** : Abidjan, Cocody

### **🇧🇫 Burkina Faso**
- **Support** : Via WhatsApp/Email
- **Partenaires locaux** : Banques et opérateurs

## 💰 Tarification CinetPay

### **Frais de transaction :**
- **Mobile Money** : 2-3% (négociable selon le volume)
- **Cartes bancaires** : 3-4%
- **Pas de frais d'installation**
- **Pas d'abonnement mensuel**

### **Retrait des fonds :**
- **Gratuit** vers comptes bancaires BCEAO
- **Délai** : 24-48h ouvrables
- **Minimum** : 10 000 FCFA

## 🎯 Avantages pour EWES

### **✅ Pour vos clients burkinabé :**
- **Confiance** - Marque connue localement
- **Simplicité** - Interface en français
- **Rapidité** - Paiement en 2-3 clics
- **Choix** - Tous les moyens de paiement

### **✅ Pour votre business :**
- **Fiabilité** - 99.9% de disponibilité
- **Support** - Équipe réactive en français
- **Reporting** - Dashboard détaillé
- **Sécurité** - Certification PCI DSS

## ⚠️ Points importants

1. **Commencez en mode test** avant la production
2. **Gardez votre Secret Key confidentielle**
3. **Testez tous les moyens de paiement**
4. **Configurez les webhooks** pour les notifications
5. **Préparez un support client** pour les questions

## 🚀 Résultat final

Avec CinetPay, vos clients burkinabé pourront :
- **Payer avec Orange Money** en 30 secondes
- **Utiliser Moov Money** facilement  
- **Payer par carte** s'ils préfèrent
- **Avoir confiance** dans une solution locale
- **Bénéficier d'un support** en français

**Votre plateforme EWES sera parfaitement adaptée au marché burkinabé ! 🇧🇫🚀**
