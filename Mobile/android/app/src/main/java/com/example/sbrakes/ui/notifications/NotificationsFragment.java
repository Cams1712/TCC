package com.example.sbrakes.ui.notifications;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.sbrakes.R;
import com.example.sbrakes.databinding.FragmentNotificationsBinding;

public class NotificationsFragment extends Fragment {

    private FragmentNotificationsBinding binding;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        NotificationsViewModel notificationsViewModel =
                new ViewModelProvider(this).get(NotificationsViewModel.class);

        binding = FragmentNotificationsBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        // Selecionando Componente TexField;
        EditText txtRedefinaSenha = root.findViewById(R.id.txtRedefinaSenha);
        EditText txtRedefinaSenhaNovamente = root.findViewById(R.id.txtRedefinaSenhaNovamente);

        // Evento de Login do Usuário
        Button btEnviar = root.findViewById(R.id.btEnviar);
        btEnviar.setOnClickListener(new View.OnClickListener() {
            // Variáveis que vão armazenar os valores do TexField
            String novasenha;
            String senha;

            @Override
            public void onClick(View v) {
                // Coletando dados do TexField
                novasenha = txtRedefinaSenhaNovamente.getText().toString().trim();
                senha = txtRedefinaSenha.getText().toString().trim();

                // Verificação dos campos a serem preenchidos corretamente
                if (!novasenha.equals("") && !senha.equals("")) {


                    // Login(credencial, senha, requisicaoVolley);
                } else {


                }
            }
        });





        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}