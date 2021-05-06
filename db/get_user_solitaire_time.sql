SELECT MIN(time) FROM solitaire WHERE user_id = $1 AND gamewon = true;
