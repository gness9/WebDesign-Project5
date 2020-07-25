SELECT organization, email, crypted_password, first || ' ' || last AS author, users.created_at AS date
FROM users 
ORDER BY users.created_at ASC;