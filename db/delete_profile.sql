DELETE FROM memory WHERE user_id = $1;
DELETE FROM solitaire WHERE user_id = $1;
DELETE FROM users WHERE id = $1;