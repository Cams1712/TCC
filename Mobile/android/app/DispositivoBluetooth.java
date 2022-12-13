import android.bluetooth.BluetoothDevice;

public class DispositivoBluetooth {
    private String nome;
    private String mac;
    private boolean conectado;
    private BluetoothDevice dispositivo;

    public DispositivoBluetooth(String nome, String mac, boolean conectado, BluetoothDevice dispositivo) {
        this.nome = nome;
        this.mac = mac;
        this.conectado = conectado;
        this.dispositivo = dispositivo;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public boolean isConectado() {
        return conectado;
    }

    public void setConectado(boolean conectado) {
        this.conectado = conectado;
    }

    public BluetoothDevice getDispositivo() {
        return dispositivo;
    }

    public void setDispositivo(BluetoothDevice dispositivo) {
        this.dispositivo = dispositivo;
    }
}
