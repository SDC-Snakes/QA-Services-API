-- CREATE SCHEMA
-- COMMAND: \i ~/Documents/HackReactor/Week8/QA-Services-API/dbSetup.sql

DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE questions (
	id integer NOT NULL PRIMARY KEY,
	product_id integer NOT NULL,
	body varchar(255) NOT NULL,
	date_written double precision NOT NULL,
	asker_name varchar(255) NOT NULL,
  asker_email varchar(255) NOT NULL,
	reported boolean NOT NULL,
  helpful integer NOT NULL
);

CREATE TABLE answers (
	id integer NOT NULL PRIMARY KEY,
  question_id integer NOT NULL REFERENCES questions(id),
	body varchar(255) NOT NULL,
	date_written double precision NOT NULL,
	answerer_name varchar(255) NOT NULL,
  answerer_email varchar(255) NOT NULL,
  reported boolean NOT NULL,
	helpful integer NOT NULL
);

CREATE TABLE answers_photos (
	id integer NOT NULL,
  answer_id integer NOT NULL REFERENCES answers(id),
	url varchar(255) NOT NULL
);

-- LOAD IN CSV DATA

\copy questions FROM '~/Documents/HackReactor/Week8/csv/questions.csv' DELIMITER ',' CSV HEADER;

\copy answers FROM '~/Documents/HackReactor/Week8/csv/answers.csv' DELIMITER ',' CSV HEADER;

\copy answers_photos FROM '~/Documents/HackReactor/Week8/csv/answers_photos.csv' DELIMITER ',' CSV HEADER;