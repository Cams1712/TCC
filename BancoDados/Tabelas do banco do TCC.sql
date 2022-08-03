use camila_gomes;

CREATE TABLE funcionarios (
	num_funcionario VARCHAR(10) NOT NULL PRIMARY KEY,
	foto_perfil LONGBLOB NOT NULL,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
    	senha VARCHAR(8) NOT NULL,
	cpf VARCHAR(11) NOT NULL,
	endereco_principal VARCHAR(80) NOT NULL,
	ativo BOOL NOT NULL
);
