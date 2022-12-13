package com.example.sbrakes;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SwitchCompat;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.Dialog;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.google.android.material.snackbar.Snackbar;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class FreioActivity extends AppCompatActivity implements Runnable{

    //Objeto que irá armazenar as configurações do harwdware de Bluetooth do celular
    private BluetoothAdapter adaptadorBluetooth;
    //Objeto socket para iniciar a conexão com o dispositivo Bluetooth
    BluetoothSocket socketBluetooth;
    BluetoothDevice dispositivoConectar;
    //Objetos dos componentes da tela
    TextView tvLigado, tvDesligado, tvStatus;
    SwitchCompat btSwitch;
    //Objeto para representar o fundo da tela
    ConstraintLayout tela;
    //Objeto para receber dados do módulo Bluetooth
    InputStream dadosHc06;
    //Classe do Dialog para controlar a sua exibição
    Dialog dialog;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_freio2);
        TextView txtTrocarSenha = findViewById(R.id.txtTrocarSenha);

        txtTrocarSenha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent it = new Intent(FreioActivity.this, TrocarSenha.class);
                startActivity(it);
            }
        });

        //Verificar se já foi aceita a permissão de localização
        if (!verificaPermissoes()) {
            //Caso não aceita, pergunta novamente para que seja atribuída
            requisitaPermissoes();
        }

        //Iniciar o Alert
        dialog = criarAlert();

        tvLigado = findViewById(R.id.tvLigado);
        tvDesligado = findViewById(R.id.tvDesligado);
        btSwitch = findViewById(R.id.swLigaDesliga);
        tvStatus = findViewById(R.id.tvStatus);
        Button btConectar = findViewById(R.id.btConectar);
        tela = findViewById(R.id.tela);

        //Verifica se o disposito está conectado
        if(socketBluetooth != null && socketBluetooth.isConnected()){
            dialog.cancel(); //Remove o alert
        }else{
            dialog.show(); //Exibe o alert
        }

        //Iniciando um objeto com as especificações do módulo Bluetooth do smartphone
        adaptadorBluetooth = BluetoothAdapter.getDefaultAdapter();

        //Se foi detectado hardware Bluetooth no dispositivo
        if(adaptadorBluetooth != null){
            //Verificação se o Bluetooth está desligado
            if (!adaptadorBluetooth.isEnabled()) {
                //Se estiver, abre popup perguntando se a pessoa deseja ativar ou não
                Intent habilitarBluetooth = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                startActivityForResult(habilitarBluetooth, 10);
            } else {
                //Criação da Intent para executar um BroadcastReceiver vinculada a pesquisa de dispositivos Bluetooth
                IntentFilter intentBluetooth = new IntentFilter(BluetoothDevice.ACTION_FOUND);
                //Requisistando a execução do BroadcastReceiver
                registerReceiver(mReceiver, intentBluetooth);

                //Verificação se a permissão foi adicionado ao Mainfest e permitida pelo usuário
                if (ActivityCompat.checkSelfPermission(FreioActivity.this, Manifest.permission.BLUETOOTH_SCAN) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(FreioActivity.this, new String[]{Manifest.permission.BLUETOOTH_SCAN}, 500);
                }
                //Inicia a verificação/procura de dispositivos
                adaptadorBluetooth.startDiscovery();
            }
        }else{
            //Caso contrário, ou seja, se o dispositivo não possui Bluetooth
            //Exibe mensagem de aviso sobre não possuir o recurso
            Snackbar.make(findViewById(R.id.tela), R.string.erroSemBluetooth, Snackbar.LENGTH_LONG).show();
        }


        //Evento que é chamado quando o Switch muda de posição
        //Se estiver para a esquerda (desligado) é enviado para o Arduino a letra D
        //Se estiver para a direita (ligado) é enviado para o Arduino a letra L
        //As letras L e D simbolizam para o motor ligar ou desligar
        btSwitch.setOnCheckedChangeListener((buttonView, isChecked) -> {
            //Verifica se o dispositivo está pareado
            if (!socketBluetooth.isConnected()) {
                //Exibe mensagem de aviso que é necessário conectar a um dispositivo antes de enviar mensagem
                Snackbar.make(findViewById(R.id.tela), R.string.txtDesconectado, Snackbar.LENGTH_LONG).show();
            } else {
                //Objeto para armazenar o texto a ser enviado
                final String[] textoLigar = {"L"};
                final String[] textoDesligar = {"D"};

                //Iniciando objeto de OutputStream para envio de dados
                OutputStream outputStream = null;
                try {
                    //Configurando o outputStream para envio de dados na conexão realizada pelo socket
                    outputStream = socketBluetooth.getOutputStream();

                    outputStream.write(isChecked ? textoLigar[0].getBytes() : textoDesligar[0].getBytes());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public Dialog criarAlert() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        // Get the layout inflater
        LayoutInflater inflater = getLayoutInflater();

        // Inflate and set the layout for the dialog
        // Pass null as the parent view because its going in the dialog layout
        builder.setView(inflater.inflate(R.layout.layout_carregando, null))
                // Add action buttons
                .setPositiveButton("Fechar", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int id) {
                        dialog.cancel();
                    }
                });
        return builder.create();
    }

    //BroadcastReceiver a ser executado sempre que um dispositivo Bluetooth for encontrado
    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {

        @SuppressLint("MissingPermission")
        @RequiresApi(api = Build.VERSION_CODES.S)
        @Override
        public void onReceive(Context context, Intent intent) {
            //Assim que um dispositivo é encontrado...
            if (BluetoothDevice.ACTION_FOUND.equals(intent.getAction())) {
                //Recupera o dipositivo encontrado pela pesquisa
                BluetoothDevice dispositivoEncontrado = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);

                Log.d("BLUT", ">>>>>>>>>>>>>>>>>>>> DISPOSITIVO: " + dispositivoEncontrado.getName());

                if(dispositivoEncontrado.getName() != null) {
                    //Verificar se o dispositivo encontrado é o que precisamos conectar
                    if (dispositivoEncontrado.getName().equals("HC-06")) {
                        dispositivoConectar = dispositivoEncontrado;

                        //Cria uma Thread para conectar no dispositivo
                        Thread mBlutoothConnectThread = new Thread(FreioActivity.this);
                        mBlutoothConnectThread.start();
                    }
                }
            }
        }
    };

    //Método que irá verificar se as permissões necessárias já foram permitidas ou não
    private boolean verificaPermissoes() {
        return ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED &&
                ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED;
    }

    //Caso as permissões não foram aprovadas, requisita novamente
    private void requisitaPermissoes() {
        if (ActivityCompat.checkSelfPermission(FreioActivity.this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(FreioActivity.this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 400);
        }
        if (ActivityCompat.checkSelfPermission(FreioActivity.this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(FreioActivity.this, new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, 600);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(mReceiver != null){
            // Don't forget to unregister the ACTION_FOUND receiver.
            unregisterReceiver(mReceiver);
        }
    }

    @SuppressLint("MissingPermission")
    @Override
    public void run() {
        try {
            //Log para acompanhar qual o dispositivo a ser conectado
            Log.d("BLUT", ">>>>>>>>>>>>>>>>>>>> DISPOSITIVO: " + dispositivoConectar.getName());

            //Atribuindo o UUID para o módulo Bluetooth do smartphone
            UUID applicationUUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
            //Iniciando o socket entre o módulo Bluetooth do smartphone e o dispositivo escolhido na lista quando pesquisou
            socketBluetooth = dispositivoConectar.createRfcommSocketToServiceRecord(applicationUUID);

            //Iniciando um objeto com as especificações do módulo Bluetooth do smartphone
            BluetoothAdapter adaptadorBluetooth = BluetoothAdapter.getDefaultAdapter();
            //Interrompendo a pesquisa por novos dispositivos
            adaptadorBluetooth.cancelDiscovery();

            //Inicia a conexão com o dispositivo
            socketBluetooth.connect();

            //Iniciando objeto de OutputStream para envio de dados
            OutputStream outputStream = null;
            try {
                //Configurando o outputStream para envio de dados na conexão realizada pelo socket
                outputStream = socketBluetooth.getOutputStream();

                String[] iniciar = new String[]{"I"};
                outputStream.write(iniciar[0].getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }


            //Atualiza a posição do Switch para conectado
            new Handler(Looper.getMainLooper()).post(() -> {
                tvStatus.setText("Conectado");
                dialog.cancel(); //Remove o alert
            });
            //Exibe mensagem de aviso se conectado com sucesso
            Snackbar.make(findViewById(R.id.tela), R.string.txtConectado, Snackbar.LENGTH_LONG).show();

            dadosHc06 = socketBluetooth.getInputStream();

            while(true){
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                int nRead;
                byte[] data = new byte[1024];
                nRead = dadosHc06.read(data, 0, data.length);
                buffer.write(data, 0, nRead);

                buffer.flush();
                byte[] byteArray = buffer.toByteArray();

                String text = new String(byteArray, StandardCharsets.UTF_8);
                dadosHc06.read(); // <-- data from device
                Log.d("CONFERE", " >>>>>>>>>>>>>>>>>> " + text);

                if(text.contains("n") ){
                    //Atualiza a posição do Switch para conectado
                    new Handler(Looper.getMainLooper()).post(() -> btSwitch.setChecked(true));
                }
                if(text.contains("f")){
                    //Atualiza a posição do Switch para conectado
                    new Handler(Looper.getMainLooper()).post(() -> btSwitch.setChecked(false));
                }
            }
        } catch (IOException e) {
            //Exibe mensagem de aviso caso não seja possível a conexão
            Snackbar.make(findViewById(R.id.tela), R.string.txtDesconectado, Snackbar.LENGTH_LONG).show();

            e.printStackTrace();
        }
    }

}