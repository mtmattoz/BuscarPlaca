
import { Drawer } from 'expo-router/drawer';
import { usePathname, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const menus = [
  { titulo: 'Início', rota: '/', icone: 'home-outline' },
  { titulo: 'Consultar', rota: '/consulta', icone: 'search-outline' },
  { titulo: 'Histórico', rota: '/historico', icone: 'time-outline' },
  { titulo: 'Sobre', rota: '/sobre', icone: 'information-circle-outline' },
];

function ConteudoDrawer({ navigation }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.cabecalho}>
          <Ionicons
            name="car-sport-outline"
            size={42}
            color="#2563EB"
          />

          <Text style={styles.titulo}>BuscarPlaca</Text>
          <Text style={styles.subtitulo}>
            Consulta de veículos
          </Text>
        </View>

        <View style={styles.lista}>
          {menus.map((item) => {
            const selecionado = pathname === item.rota;

            return (
              <Pressable
                key={item.rota}
                style={[
                  styles.botao,
                  selecionado && styles.botaoAtivo,
                ]}
                onPress={() => {
                  navigation.closeDrawer();
                  router.navigate(item.rota);
                }}
              >
                <Ionicons
                  name={item.icone}
                  size={23}
                  color={selecionado ? '#2563EB' : '#4B5563'}
                />

                <Text
                  style={[
                    styles.textoBotao,
                    selecionado && styles.textoAtivo,
                  ]}
                >
                  {item.titulo}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <ConteudoDrawer {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  cabecalho: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginBottom: 15,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 10,
  },

  subtitulo: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  lista: {
    paddingHorizontal: 12,
  },

  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 5,
    gap: 15,
  },

  botaoAtivo: {
    backgroundColor: '#EFF6FF',
  },

  textoBotao: {
    fontSize: 16,
    color: '#374151',
  },

  textoAtivo: {
    color: '#2563EB',
    fontWeight: 'bold',
  },
});
