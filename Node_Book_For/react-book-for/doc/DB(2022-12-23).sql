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
username	VARCHAR(255),
b_code	BIGINT auto_increment PRIMARY KEY,				
b_paragraph	VARCHAR(255),			
b_location	VARCHAR(125),						
b_state	VARCHAR(20)	,					
b_reg_date	timestamp	NOT NULL	default current_timestamp,
b_buy_date	VARCHAR(125),
b_start_date	VARCHAR(125),
b_done_date	VARCHAR(125)
);

CREATE TABLE book_list (
isbn	VARCHAR(50)		PRIMARY KEY,
title	VARCHAR(255)	NOT NULL	,
thumbnail	VARCHAR(255),		
authors	VARCHAR(125)	NOT NULL	,
publisher	VARCHAR(50)	NOT NULL,	
url	VARCHAR(125)	
);

SELECT * FROM user_book;
SELECT * FROM book_list;

select @@global.time_zone, @@session.time_zone,@@system_time_zone;
select now();