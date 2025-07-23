import React, { useEffect, useState } from 'react';
import { Platform, View, Text, ActivityIndicator } from 'react-native';
import type { FC } from 'react';
import axios from 'axios';

type House = {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
};

let MapComponent: FC<{ houses: House[] }> | null = null;

if (Platform.OS === 'web') {
  const { YMaps, Map, Placemark } = require('react-yandex-maps');
  MapComponent = ({ houses }) => (
    <YMaps>
      <Map defaultState={{ center: houses[0] ? [houses[0].latitude, houses[0].longitude] : [0,0], zoom: 16 }} width="100vw" height="100vh">
        {houses.map(house => (
          <Placemark key={house.id} geometry={[house.latitude, house.longitude]} properties={{ balloonContent: `${house.price.toLocaleString()} ₽` }} />
        ))}
      </Map>
    </YMaps>
  );
} else {
  // @ts-ignore
  const YaMap = require('react-native-yamap').default;
  const { Marker } = require('react-native-yamap');
  YaMap.init('81a164eb-7f95-48a4-b6cc-a7e616d9a200');
  MapComponent = ({ houses }) => (
    <YaMap
      style={{ flex: 1 }}
      initialRegion={{
        lat: houses[0] ? houses[0].latitude : 0,
        lon: houses[0] ? houses[0].longitude : 0,
        zoom: 16,
      }}
    >
      {houses.map(house => (
        <Marker key={house.id} point={{ lat: house.latitude, lon: house.longitude }}>
          <View style={{ backgroundColor: 'white', padding: 4, borderRadius: 6 }}>
            <Text style={{ fontWeight: 'bold', color: '#222' }}>{house.price.toLocaleString()} ₽</Text>
          </View>
        </Marker>
      ))}
    </YaMap>
  );
}

export default function App() {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  const getBackendUrl = () => {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000/house';
    }
    return 'http://localhost:3000/house';
  };

  useEffect(() => {
    axios.get(getBackendUrl())
      .then(res => setHouses(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading || houses.length === 0) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return <View style={{ flex: 1 }}>{MapComponent && <MapComponent houses={houses} />}</View>;
}
