CREATE DATABASE howdo;
DROP DATABASE howdo;
USE bookfordb;
DROP DATABASE howdo;

DROP TABLE my_paragraph;
SELECT * FROM book_list;

INSERT INTO user (username, password,nickname) values ("bjw1403@gmail.com","1234", "dd");

UPDATE user SET price = 3000 WHERE username='bjw1403@gmail.com';
UPDATE subscribe SET approved_at = "2023-02-08" WHERE partner_order_id='kpkp@naver.com';

CREATE TABLE IF NOT EXISTS my_paragraph (
p_code	BIGINT	AUTO_INCREMENT,
my_username	VARCHAR(255)	NOT NULL	,
my_isbn	VARCHAR(50)	NOT NULL,	
my_paragraph	VARCHAR(600),
PRIMARY KEY(p_code)
);