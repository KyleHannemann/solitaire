UPDATE users SET username = $2, password = $3 WHERE id = $1;
UPDATE solitaire SET username = $2 WHERE user_id = $1;
UPDATE memory SET username = $2 WHERE user_id = $1;