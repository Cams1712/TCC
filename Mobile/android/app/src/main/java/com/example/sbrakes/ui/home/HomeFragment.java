package com.example.sbrakes.ui.home;

import android.Manifest;
import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothSocket;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import com.example.sbrakes.R;
import com.example.sbrakes.databinding.FragmentHomeBinding;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

public class HomeFragment extends Fragment implements Runnable {

    private FragmentHomeBinding binding;
    private Boolean statusFreio = false;

    // Variáveis Bluetooth
    private BluetoothAdapter adaptadorBluetooth;
    BluetoothSocket socketBluetooth;
    BluetoothDevice dispositivoConectar;
    InputStream dadosHc06;
    Thread threadHc06;
    volatile boolean pararLeitura;
    byte[] readBuffer;
    int readBufferPosition;
    View root;

    @SuppressLint("MissingPermission")
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        root = binding.getRoot();



        // Componentes do Fragment
        Button btnActive = root.findViewById(R.id.btnActive);
        TextView txtStatus = root.findViewById(R.id.txtStatus);
        TextView txtStatusBluetooth = root.findViewById(R.id.txtStatusBluetooth);

        // Verificando acesso a localização
        if (!verificarPermissoes()) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                requisitarPermissoes();
            }
        }

        // Verificando se o dispositivo está conectado
        if (socketBluetooth != null && socketBluetooth.isConnected()) {
            txtStatusBluetooth.setText("CONECTADO");
        } else {
            txtStatusBluetooth.setText("DESCONECTADO");
        }

        // Verifica a condição inicial do Bluetooth
        if (txtStatus.getText().toString().equals("ATIVADO")) {
            txtStatus.setTextColor(Color.GREEN);
        } else {
            txtStatus.setTextColor(Color.RED);
        }

        // Evento de clique do botão para ativar / desativar o Bluetooth
        btnActive.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                statusFreio = !statusFreio;

                if (statusFreio) {
                    btnActive.setText("DESATIVAR");
                    txtStatus.setTextColor(Color.GREEN);
                    txtStatus.setText("ATIVADO");
                } else {
                    btnActive.setText("ATIVAR");
                    txtStatus.setTextColor(Color.RED);
                    txtStatus.setText("DESATIVADO");
                }
                
                // Objeto com as especificações do módulo Bluetooth do celular
                adaptadorBluetooth = BluetoothAdapter.getDefaultAdapter();
                if (adaptadorBluetooth != null) {
                    // Verificando se o Bluetooth está desligado
                    if(!adaptadorBluetooth.isEnabled()) {
                        // Abre um popup para que o usuário ative
                        Intent habilitar = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
                        startActivityForResult(habilitar, 10);
                    } else {
                        IntentFilter intentBluetooth = new IntentFilter(BluetoothDevice.ACTION_FOUND);
                        requireActivity().registerReceiver(mReceiver, intentBluetooth);

                        adaptadorBluetooth.startDiscovery();
                    }
                } else {
                    Toast.makeText(getActivity(), "Não há bluetooth", Toast.LENGTH_SHORT).show();
                }
/*
                // Verificando a condição de status do botão (ativado / desativado)
                // Verificando se o dispositivo está pareado
               if (!socketBluetooth.isConnected()) {
                  Toast.makeText(getActivity(), "Conecte-se a um dispositivo", Toast.LENGTH_SHORT).show();
               } else {
                   final String[] txtLigado = {"L"};
                    final String[] txtDesligado = {"D"};

                    // Objeto OutpuStream para enviar dados
                    OutputStream outputStream = null;

                    try {
                        // Envio de dados
                        outputStream = socketBluetooth.getOutputStream();
                        outputStream.write(statusFreio ? txtLigado[0].getBytes() :
                               txtDesligado[0].getBytes());
                   } catch (IOException e) {
                       e.printStackTrace();
                   }
                    }
*/
            }
        });

        return root;
    }

    private final BroadcastReceiver mReceiver = new BroadcastReceiver() {
        @SuppressLint("MissingPermission")
        @RequiresApi(api = Build.VERSION_CODES.S)
        @Override
        public void onReceive(Context context, Intent intent) {
            // Assim que um dispositivo é encontrado
            if (BluetoothDevice.ACTION_FOUND.equals(intent.getAction())) {
                // Recupera o dispositivo encontrado pela pesquisa
                BluetoothDevice dispositivoEncontrado =
                        intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);


                if (dispositivoEncontrado.getName() != null) {
                    Log.d("BLUT", ">>>>>>>>>>>>> DISPOSITIVO: " + dispositivoEncontrado.getName());

                    // Verifica se o dispositivo encontrado é o que precisamos conectar
                    if (dispositivoEncontrado.getName().equals("HC-06")) {
                        dispositivoConectar = dispositivoEncontrado;

                        Thread mBluetoothConnectThread = new Thread((Runnable) HomeFragment.this);
                        mBluetoothConnectThread.start();
                    }
                }
            }
        }
    };

    // Método para verificar as permissões
    private boolean verificarPermissoes() {
        return ContextCompat.checkSelfPermission(getActivity(), Manifest.permission.ACCESS_FINE_LOCATION) ==
                PackageManager.PERMISSION_GRANTED && ContextCompat.checkSelfPermission(getActivity(), Manifest.permission.ACCESS_COARSE_LOCATION) ==
                PackageManager.PERMISSION_GRANTED;
    }

    // Método para requisitar permissões
    @RequiresApi(api = Build.VERSION_CODES.S)
    private void requisitarPermissoes() {
        if (ActivityCompat.checkSelfPermission(root.getContext(), Manifest.permission.ACCESS_FINE_LOCATION) !=
        PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 400);
        }

        if(ActivityCompat.checkSelfPermission(root.getContext(), Manifest.permission.ACCESS_COARSE_LOCATION) !=
        PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.ACCESS_COARSE_LOCATION}, 600);
        }

        if(ActivityCompat.checkSelfPermission(root.getContext(), Manifest.permission.BLUETOOTH_SCAN) !=
                PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(getActivity(), new String[]{Manifest.permission.BLUETOOTH_SCAN}, 800);
        }
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();

    //    if (mReceiver != null) {
           //requireActivity().unregisterReceiver(mReceiver);
     //   }

     //   binding = null;
    }

    @SuppressLint("MissingPermission")
    @Override
    public void run() {
        try {
            Log.d("BLUT", "DISPOSITIVO: " + dispositivoConectar.getName());

            UUID applicationUUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
            socketBluetooth = dispositivoConectar.createRfcommSocketToServiceRecord(applicationUUID);

            BluetoothAdapter adaptadorBluetooth = BluetoothAdapter.getDefaultAdapter();
            adaptadorBluetooth.cancelDiscovery();
            socketBluetooth.connect();

            Toast.makeText(getActivity(), "Conectado com sucesso", Toast.LENGTH_SHORT).show();
            dadosHc06 = socketBluetooth.getInputStream();

            while(true) {
                ByteArrayOutputStream buffer = new ByteArrayOutputStream();
                int nRead;
                byte[] data = new byte[1024];
                nRead = dadosHc06.read(data, 0, data.length);
                buffer.write(data, 0, nRead);
                buffer.flush();
                byte[] byteArray =  buffer.toByteArray();

                String text = new String(byteArray, StandardCharsets.UTF_8);
                dadosHc06.read();
                Log.d("CONFERE", ">>>>>>>>> " + text);

                if(text.contains("on")) {
                    statusFreio = true;
                }

                if (text.contains("off")) {
                    statusFreio = false;
                }
            }
        } catch (Exception e) {
            Toast.makeText(getActivity(), "ERRO", Toast.LENGTH_SHORT).show();
            e.printStackTrace();
        }
    }
}
