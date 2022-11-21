-- Esse script vale para o MySQL 8.x. Se seu MySQL for 5.x, precisa executar essa linha comentada:
-- CREATE DATABASE IF NOT EXISTS capivara;
CREATE DATABASE IF NOT EXISTS capivara DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE capivara;

CREATE TABLE IF NOT EXISTS evento (
  idshow INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(60) NOT NULL,
  data DATETIME NOT NULL,
  link VARCHAR(500) NOT NULL,
  endereco VARCHAR(200) NOT NULL,
  PRIMARY KEY (idshow)
);
