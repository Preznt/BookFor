-- Book For

CREATE DATABASE BookForDB;
USE BookForDB;

DROP TABLE user_book;

CREATE TABLE user (
username	VARCHAR(255)		PRIMARY KEY,
password	VARCHAR(255)	NOT NULL,	
profile_image	VARCHAR(255),		
nickname	VARCHAR(20)	NOT NULL	UNIQUE,
birthdate	VARCHAR(255),		
level	INT	,	
delete_date	VARCHAR(255)
);

CREATE TABLE user_book (
my_username	VARCHAR(255),	
my_isbn	BIGINT	,
my_paragraph	VARCHAR(255)	,
my_location	VARCHAR(125)	,
my_state	VARCHAR(20)	,
my_reg_date	timestamp	NOT NULL  default current_timestamp,
my_buy_date	VARCHAR(125)	,
my_start_date	VARCHAR(125),	
my_done_date	VARCHAR(125),	
		PRIMARY KEY(my_username, my_isbn)
);


CREATE TABLE book_list (
isbn	VARCHAR(50)	NOT NULL	PRIMARY KEY,
title	VARCHAR(255)	NOT NULL,	
thumbnail	VARCHAR(255)	,	
authors	VARCHAR(125)	NOT NULL	,
publisher	VARCHAR(50)	NOT NULL,	
url	VARCHAR(500)		
);

SELECT * FROM user_book;
SELECT * FROM book_list;

select @@global.time_zone, @@session.time_zone,@@system_time_zone;
select now();