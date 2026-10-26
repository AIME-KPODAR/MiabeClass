UPDATE notifications
SET
    title = 'Bienvenue sur MiabeClass',
    message = 'Bienvenue sur MiabeClass ! Votre compte a été créé avec succès.'
WHERE id = 1;

UPDATE notifications
SET
    title = 'Nouveau cours disponible',
    message = 'Un nouveau cours vient d’être ajouté à votre espace de formation.'
WHERE id = 2;

UPDATE notifications
SET
    title = 'Mise à jour de la plateforme',
    message = 'La plateforme MiabeClass a été mise à jour avec de nouvelles fonctionnalités.'
WHERE id = 3;

UPDATE notifications
SET
    title = 'Votre abonnement',
    message = 'Votre abonnement est actuellement en attente de confirmation.'
WHERE id = 4;

UPDATE notifications
SET
    title = 'Rappel',
    message = 'N’oubliez pas de consulter régulièrement vos nouveaux cours.'
WHERE id = 5;



SELECT * FROM notifications;


INSERT INTO notifications
(user_id, title, message, type, is_read)
VALUES
(
  8,
  'Nouveau devoir disponible',
  'Un nouveau devoir vient d’être ajouté à votre espace de formation.',
  'info',
  false
);


SELECT id, first_name, last_name, email
FROM users
ORDER BY id;


SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;


SELECT COUNT(*) FROM users;


SELECT
    column_name,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;


SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;


INSERT INTO users
(first_name, last_name, email, password_hash)
VALUES
(
  'Aime',
  'Kpodar',
  'test@miabeclass.local',
  '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
);


SELECT id, first_name, last_name, email, role, is_active
FROM users;


INSERT INTO notifications
(user_id, title, message, type, is_read)
VALUES
(
  1,
  'Nouveau cours disponible',
  'Un nouveau cours vient d’être ajouté à votre espace de formation.',
  'info',
  false
);


SELECT id, user_id, title, message, type, is_read
FROM notifications
ORDER BY created_at DESC;


select * FROM notifications;


SELECT
    id,
    user_id,
    title,
    message,
    type,
    is_read,
    created_at
FROM notifications
ORDER BY id;



UPDATE notifications
SET
    title = 'Bienvenue sur MiabeClass',
    message = 'Bienvenue sur MiabeClass ! Votre compte a été créé avec succès.',
    type = 'success',
    is_read = false,
    read_at = NULL
WHERE id = 1;

UPDATE notifications
SET
    title = 'Nouveau cours disponible',
    message = 'Un nouveau cours vient d’être ajouté à votre espace de formation.',
    type = 'info',
    is_read = false,
    read_at = NULL
WHERE id = 2;

UPDATE notifications
SET
    title = 'Mise à jour de la plateforme',
    message = 'La plateforme MiabeClass a été mise à jour avec de nouvelles fonctionnalités.',
    type = 'info',
    is_read = false,
    read_at = NULL
WHERE id = 3;

UPDATE notifications
SET
    title = 'Votre abonnement',
    message = 'Votre abonnement est actuellement en attente de confirmation.',
    type = 'warning',
    is_read = false,
    read_at = NULL
WHERE id = 4;

UPDATE notifications
SET
    title = 'Rappel',
    message = 'N’oubliez pas de consulter régulièrement vos nouveaux cours.',
    type = 'info',
    is_read = false,
    read_at = NULL
WHERE id = 5;



SELECT id, user_id, title, is_read, read_at
FROM notifications
ORDER BY id;


-- Notification 1
UPDATE notifications
SET
    title = 'Bienvenue sur MiabeClass',
    message = 'Bienvenue sur MiabeClass ! Votre compte a été créé avec succès.',
    type = 'success',
    is_read = false,
    read_at = NULL
WHERE id = 1;

-- Notification 2
UPDATE notifications
SET
    title = 'Nouveau cours disponible',
    message = 'Un nouveau cours est maintenant disponible dans votre espace de formation.',
    type = 'info',
    is_read = false,
    read_at = NULL
WHERE id = 2;

-- Notification 3
UPDATE notifications
SET
    title = 'Mise à jour de la plateforme',
    message = 'MiabeClass a été mise à jour avec de nouvelles fonctionnalités.',
    type = 'info',
    is_read = false,
    read_at = NULL
WHERE id = 3;

-- Notification 4
UPDATE notifications
SET
    title = 'Votre abonnement',
    message = 'Votre abonnement est actuellement en attente de confirmation.',
    type = 'warning',
    is_read = false,
    read_at = NULL
WHERE id = 4;

-- Notification 5
UPDATE notifications
SET
    title = 'Rappel important',
    message = 'N’oubliez pas de consulter régulièrement vos nouveaux cours et notifications.',
    type = 'info',
    is_read = false,
    read_at = NULL
WHERE id = 5;


SELECT
    id,
    user_id,
    title,
    message,
    type,
    is_read,
    read_at
FROM notifications
ORDER BY id;


SELECT COUNT(*) AS total
FROM notifications
WHERE is_read = FALSE;



UPDATE notifications
SET
    is_read = FALSE,
    read_at = NULL
WHERE id IN (1, 2, 3, 4, 5);



SELECT
    id,
    title,
    is_read,
    read_at
FROM notifications
ORDER BY id;

SELECT
    id,
    user_id,
    title,
    is_read,
    read_at
FROM notifications
ORDER BY id;


SELECT COUNT(*) AS total_non_lues
FROM notifications
WHERE is_read = FALSE;


UPDATE notifications
SET
    is_read = FALSE,
    read_at = NULL
WHERE id IN (1, 2, 3, 4, 5);


SELECT
    id,
    title,
    is_read,
    read_at
FROM notifications
ORDER BY id;

SELECT * FROM notifications ;
