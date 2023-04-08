DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE product (
	id integer NOT NULL PRIMARY KEY
);

CREATE TABLE question (
	question_id integer NOT NULL PRIMARY KEY,
	product_id integer NOT NULL REFERENCES product(id),
	question_body varchar(255) NOT NULL,
	question_date varchar(255) NOT NULL,
	asker_name varchar(255) NOT NULL,
	question_helpfulness int NOT NULL,
	reported bool NOT NULL
);



CREATE TABLE answer_result (
	answer_id integer NOT NULL PRIMARY KEY,
	body varchar(255) NOT NULL,
	date varchar(255) NOT NULL,
	answerer_name varchar(255) NOT NULL,
	helpfulness integer NOT NULL,
	question_id integer NOT NULL REFERENCES question(question_id)
);



CREATE TABLE photo (
	answer_id integer NOT NULL REFERENCES answer_result(answer_id),
	id integer NOT NULL,
	url varchar(255) NOT NULL
);