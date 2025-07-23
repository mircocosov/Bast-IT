import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ActivityIndicator, Platform, Animated, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './appStyles';

interface House {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
}

let YaMap: any, Marker: any;
if (Platform.OS !== 'web') {
  YaMap = require('react-native-yamap').default;
  Marker = require('react-native-yamap').Marker;
  YaMap.init('81a164eb-7f95-48a4-b6cc-a7e616d9a200');
}

export default function App() {
  const [houses, setHouses] = useState<House[]>([]);
  const [selectedHouseIndex, setSelectedHouseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<any>(null);

  const getBackendUrl = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000/house';
    }
    return 'http://localhost:3000/house';
  };

  useEffect(() => {
    axios.get<House[]>(getBackendUrl())
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setHouses(res.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Анимация появления (оставь как было, если нужно)
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const mapOpacity = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(headerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(mapOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(footerOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
  if (!houses.length) {
    return <View style={styles.center}><Text>Нет данных о домах</Text></View>;
  }
  if (Platform.OS === 'web') {
    return <View style={styles.center}><Text>Карта работает только на Android/iOS</Text></View>;
  }

  const selectedHouse = houses[selectedHouseIndex];

  // Фокусировка карты на выбранном доме
  const focusOnHouse = (index: number) => {
    setSelectedHouseIndex(index);
    const house = houses[index];
    if (mapRef.current && house) {
      mapRef.current.setCenter({ lat: house.latitude, lon: house.longitude }, 16, 0);
    }
  };

  return (
    <LinearGradient colors={['#e0eafc', '#cfdef3']} style={{ flex: 1 }}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <Text style={styles.headerText}>🏡 Bast-IT Test App</Text>
      </Animated.View>
      {/* Map (half screen) */}
      <Animated.View style={[styles.mapContainer, { opacity: mapOpacity }]}>
        <YaMap
          ref={mapRef}
          style={{ flex: 1 }}
          initialRegion={{
            lat: selectedHouse.latitude,
            lon: selectedHouse.longitude,
            zoom: 16,
          }}
        >
          <Marker point={{ lat: selectedHouse.latitude, lon: selectedHouse.longitude }}>
            <View style={styles.markerContainer}>
              <LinearGradient
                colors={['#fff', '#e0eafc']}
                style={styles.priceTag}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.priceText}>{selectedHouse.price.toLocaleString()} ₽</Text>
                <Text style={styles.addressText}>{selectedHouse.address}</Text>
              </LinearGradient>
              <View style={styles.pin} />
            </View>
          </Marker>
        </YaMap>
      </Animated.View>
      {/* Footer: список адресов */}
      <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
        <Text style={styles.footerTitle}>mircocosov</Text>
        <FlatList
          data={houses}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.addressPill,
                index === selectedHouseIndex && styles.addressPillActive,
              ]}
              onPress={() => focusOnHouse(index)}
            >
              <Text style={[
                styles.addressPillText,
                index === selectedHouseIndex && styles.addressPillTextActive,
              ]}>
                {item.address}
              </Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.footerText}>С любовью, Артем ❤️</Text>
      </Animated.View>
    </LinearGradient>
  );
}