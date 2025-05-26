	 -- use triade;
	 -- drop database triade;
	 -- create database triade;

CREATE database routeFinder;

use routeFinder;


CREATE TABLE company (

id_company INT AUTO_INCREMENT PRIMARY KEY,

corporate_name VARCHAR(45),

address VARCHAR(50),


CNPJ CHAR(14)

);


CREATE TABLE position (

id_position INT AUTO_INCREMENT PRIMARY KEY,

name VARCHAR(45),

description VARCHAR(45)

);


CREATE TABLE access_level (

id_access_level INT AUTO_INCREMENT PRIMARY KEY,

name VARCHAR(45),

description VARCHAR(45)

);


CREATE TABLE user (
id_user INT AUTO_INCREMENT PRIMARY KEY,
name_user VARCHAR(45),
password VARCHAR(45),
email VARCHAR(45),
phone VARCHAR(45),
created_at DATETIME,
fk_company INT,
FOREIGN KEY (fk_company) REFERENCES company(id_company),
fk_position INT,
FOREIGN KEY (fk_position) REFERENCES position (id_position),
fk_access_level INT,
FOREIGN KEY (fk_access_level) REFERENCES access_level(id_access_level)
);



CREATE TABLE category (

id_category INT AUTO_INCREMENT PRIMARY KEY,

type VARCHAR(45),

description VARCHAR(255)

);




CREATE TABLE alert (

id_alert INT AUTO_INCREMENT PRIMARY KEY,

name_alert VARCHAR(45),

description VARCHAR(45),

fk_user INT,

FOREIGN KEY (fk_user) REFERENCES user(id_user)

);


CREATE TABLE log (
id_log INT AUTO_INCREMENT PRIMARY KEY,
date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
description VARCHAR(200),
fk_alert INT,
FOREIGN KEY (fk_alert) REFERENCES alert(id_alert),
fk_category INT,
FOREIGN KEY (fk_category) REFERENCES category(id_category)
);

CREATE TABLE passage (
id_passage INT AUTO_INCREMENT PRIMARY KEY,
name_passage VARCHAR(200),
region VARCHAR(10),
type CHAR(1)
);


CREATE TABLE direction (
id_direction INT AUTO_INCREMENT PRIMARY KEY,
name_direction VARCHAR(200),
fk_passage INT,
FOREIGN KEY (fk_passage) REFERENCES passage(id_passage)
);


CREATE TABLE segment (
id_segment INT AUTO_INCREMENT PRIMARY KEY,
name_segment VARCHAR(100),
fk_direction INT,
FOREIGN KEY (fk_direction) REFERENCES direction(id_direction)
);


CREATE TABLE timestamp (
id_timestamp INT AUTO_INCREMENT PRIMARY KEY,
date_time DATETIME,
jam_size INT,
fk_segment INT,
FOREIGN KEY (fk_segment) REFERENCES segment(id_segment)
);
