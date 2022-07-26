use camila_gomes;

CREATE TABLE funcionarios (
	num_funcionario VARCHAR(10) NOT NULL PRIMARY KEY,
	foto_perfil LONGTEXT NOT NULL,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
    	senha VARCHAR(20) NOT NULL,
	adm BOOL NOT NULL,
	ativo BOOL NOT NULL
);

CREATE TABLE caminhoes(
	placa VARCHAR(8) NOT NULL PRIMARY KEY,
	marca VARCHAR(20) NOT NULL,
	modelo VARCHAR(20) NOT NULL,
	bluetooth VARCHAR(20) NOT NULL,
	ativo BOOL NOT NULL,
	FOREIGN KEY (piloto) REFERENCES funcionarios (num_funcionario)
);

