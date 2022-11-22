USE erpDBV2;

CREATE TABLE IF NOT EXISTS tbl_users (
username	VARCHAR(20)		PRIMARY KEY,
password	VARCHAR(125)	NOT NULL,	
real_name	VARCHAR(50)	,	
usertel	VARCHAR(15)	,	
nick_name	VARCHAR(50)	NOT NULL,	
user_role	INT	DEFAULT 9
);
DESC tbl_users;

INSERT tbl_users( 
username, password, real_name, nick_name, user_role)
VALUES (
	'bjw12','12345','성춘향','춘향아',5
    );
SELECT * FROM tbl_users;

CREATE TABLE IF NOT EXISTS tbl_product (
p_code	VARCHAR(13)		PRIMARY KEY,
p_title	VARCHAR(125)	NOT NULL,	
p_main_cat	VARCHAR(10),		
p_mid_cat	VARCHAR(10)	,	
p_sub_cat	VARCHAR(10)	,	
p_industry	VARCHAR(125),		
p_buyer	VARCHAR(125),	
p_iprice	INT	,
p_tax	INT	DEFAULT 1	,
p_oprice	INT	
);

DESC tbl_products;

INSERT tbl_product( 
p_code,p_title, p_main_cat, p_mid_cat, p_sub_cat, p_industry, p_buyer, p_iprice, p_tax,p_oprice)
VALUES ('122345621','과자','과자','과','과','식품','농심','1200','120','1500');

<<<<<<< HEAD
SELECT * FROM tbl_products;
=======
SELECT * FROM tbl_product;
>>>>>>> b7c57791f03e7a9e4e9a6a390fe6b32e2a9a0ded
