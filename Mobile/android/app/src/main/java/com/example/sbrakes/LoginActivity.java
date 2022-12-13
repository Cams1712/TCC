package com.example.sbrakes;

import static android.content.ContentValues.TAG;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.CollectionReference;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.Objects;

public class LoginActivity extends AppCompatActivity {

    // creating variables for our edit text
    private EditText credencialedt, senhaedt;


    // creating variable for button
    private Button btnLogin;
    // creating a strings for storing
    // our values from edittext fields.


    private String credencial, senha;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        TextView txtForgotPassword = findViewById(R.id.txtForgotPassword);


        // creating a strings for storing
        // our values from edittext fields.


        // creating a variable
        // for firebasefirestore.
        FirebaseFirestore db = FirebaseFirestore.getInstance();
        // initializing our edittext and buttons



        // Requisição com Volley
        RequestQueue requisicaoVolley = Volley.newRequestQueue(LoginActivity.this);

        // Remove a barra roxa de suporte
        Objects.requireNonNull(getSupportActionBar()).hide();

        // Mudando a cor da barra de status
        if (Build.VERSION.SDK_INT >= 21) {
            Window window = this.getWindow();
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.setStatusBarColor(this.getResources().getColor(R.color.BlackStatus));
        }

        // Selecionando Componente TexField;
        EditText txtCredencial = findViewById(R.id.txtCredencial);
        EditText txtSenha = findViewById(R.id.txtSenha);

        // Evento de Login do Usuário
        Button btnLogin = findViewById(R.id.btnLogin);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            // Variáveis que vão armazenar os valores do TexField
            String credencial;
            String senha;

            @Override
            public void onClick(View v) {
                // Coletando dados do TexField
                credencial = txtCredencial.getText().toString().trim();
                senha = txtSenha.getText().toString().trim();

                // Verificação dos campos a serem preenchidos corretamente
                if (!credencial.equals("") && !senha.equals("")) {

                    db.collection("Funcionarios")
                            .whereEqualTo("Credencial", credencial)
                            .whereEqualTo("Senha", senha)
                            .get()
                            .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                                @Override
                                public void onComplete(@NonNull Task<QuerySnapshot> task) {
                                    if(task.isSuccessful()) {
                                        Intent i = new Intent(LoginActivity.this, FreioActivity.class);
                                        startActivity(i);
                                    } else {
                                        Log.e("TAGERRO", "---> "+task.getException());
                                    }

                                }
                            });



                    // Login(credencial, senha, requisicaoVolley);
                } else {
                    // Criando Toast Personalizado
                    ViewGroup view = findViewById(R.id.container_toast);
                    View vw = getLayoutInflater().inflate(R.layout.custom_toast, view);
                    TextView txtMessage = vw.findViewById(R.id.txt_message);
                    txtMessage.setText("Preencha os campos corretamente");

                    Toast toast = new Toast(LoginActivity.this);
                    toast.setView(vw);
                    toast.setDuration(Toast.LENGTH_SHORT);
                    toast.show();
                }
            }
        });

        txtForgotPassword.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent it = new Intent(LoginActivity.this, Password.class);
                startActivity(it);
            }
        });
    }

    }


