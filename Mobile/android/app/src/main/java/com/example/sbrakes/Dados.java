package com.example.sbrakes;

public class Dados {
    // variables for storing our data.
    private String credencial, senha;


    // Constructor for all variables.
    public Dados(String credencial, String senha) {
        this.credencial = credencial;
        this.senha = senha;

    }

    // getter methods for all variables.
    public String getcredencial() {
        return credencial;
    }

    public void setsredencial(String credencial) {
        this.credencial = credencial;
    }

    public String getsenha() {
        return senha;
    }

    // setter method for all variables.
    public void setSenha(String senha) {
        this.senha = senha;
    }

}
