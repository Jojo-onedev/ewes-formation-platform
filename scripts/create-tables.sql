-- Création de la table formations
CREATE TABLE IF NOT EXISTS formations (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    prix DECIMAL(10,2) NOT NULL,
    mode_livraison VARCHAR(10) NOT NULL CHECK (mode_livraison IN ('auto', 'manuel')),
    lien_video TEXT NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des formations d'exemple
INSERT INTO formations (titre, description, prix, mode_livraison, lien_video) VALUES
(
    'Installation Électrique Résidentielle',
    'Apprenez les bases de l''installation électrique dans les maisons : câblage, tableaux électriques, prises et éclairage. Formation complète avec exercices pratiques.',
    25000,
    'auto',
    'https://drive.google.com/file/d/exemple1'
),
(
    'Maintenance des Équipements Industriels',
    'Formation avancée sur la maintenance préventive et corrective des équipements électriques industriels. Techniques professionnelles et normes de sécurité.',
    45000,
    'manuel',
    'https://dropbox.com/s/exemple2'
),
(
    'Sécurité Électrique et Normes',
    'Maîtrisez les normes de sécurité électrique et les procédures de protection des personnes et des biens. Formation certifiante reconnue.',
    30000,
    'auto',
    'https://drive.google.com/file/d/exemple3'
);
