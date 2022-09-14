package aula.senai.indmo.sbrakes;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class RedefinirSenha extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_redefinir_senha);

        Button btRedefinir = findViewById(R.id.btRedefinir);

        btRedefinir.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent it = new Intent(RedefinirSenha.this, InfoUsuario.class);
                startActivity(it);
            }
        });
    }
}