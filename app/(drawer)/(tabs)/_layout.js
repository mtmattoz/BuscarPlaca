
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: '#2563EB',
        headerTitle: 'BuscarPlaca',
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.getParent()?.openDrawer()}
            style={{ marginLeft: 16, padding: 5 }}
          >
            <Ionicons name="menu" size={27} color="#111827" />
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="consulta"
        options={{
          title: 'Consultar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="historico"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
