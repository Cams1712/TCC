package aula.senai.indmo.sbrakes;

import androidx.activity.OnBackPressedCallback;
import androidx.activity.OnBackPressedDispatcherOwner;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class InfoUsuario extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info_usuario);

        Button btHome = findViewById(R.id.btHome2);
        Button btUsuario = findViewById(R.id.btUsuario2);
        TextView txAlterar = findViewById(R.id.txAlterarSenha);

        txAlterar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent it = new Intent(InfoUsuario.this, RedefinirSenha.class);
                startActivity(it);
            }
        });

        btHome.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent it = new Intent(InfoUsuario.this, MainActivity.class);
                startActivity(it);
            }
        });

        btUsuario.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

            }
        });

      /*  OnBackPressedCallback voltar = new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {

            }
        }*/
    }
}