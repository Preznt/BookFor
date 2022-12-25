-- Book For

CREATE DATABASE BookForDB;
USE BookForDB;

DROP TABLE user_book;

CREATE TABLE user_book (
b_code Bigint auto_increment,
username	VARCHAR(255),
b_isbn	BIGINT		,	
b_paragraph	VARCHAR(255),						
b_location	VARCHAR(125),						
b_state	VARCHAR(20)		,				
b_reg_date	timestamp	NOT NULL	default current_timestamp,
b_buy_date	VARCHAR(125),						
b_start_date	VARCHAR(125),						
b_done_date	VARCHAR(125)						
);

SELECT * FROM user_book;