import { View, Text, StyleSheet } from 'react-native';

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>BuscarPlaca</Text>
      <Text>Bem-vindo ao aplicativo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});