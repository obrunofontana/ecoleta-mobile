import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { 
  View, 
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import styles from './styles';

const CollectPoints: React.FC = () => {
  const navitagion = useNavigation();

  // Funções pra navegação
  function handleNavigateToHome() {
    navitagion.goBack();
  }

  function handleNavigateToDetail() {
    navitagion.navigate('Details');
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateToHome}>
          <Icon name="arrow-left" color="#34cb79" size={20}/>
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo.</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta</Text>

        <View style={styles.mapContainer}>
          <MapView 
            style={styles.map} 
            initialRegion={{
              latitude: -26.205362,
              longitude: -52.683848,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}
          >
            <Marker 
              style={styles.mapMarker}
              coordinate={{latitude: -26.205362, longitude: -52.683848}}
              onPress={handleNavigateToDetail}
            >
              <View style={styles.mapMarkerContainer}>
                <Image  
                  style={styles.mapMarkerImage}
                  source={{ uri: 'https://images.unsplash.com/photo-1441123285228-1448e608f3d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'}}
                />
                <Text style={styles.mapMarkerTitle}>Mercado</Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20}}
        >
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.2.101:3001/uploads/baterias.svg"/>
            <Text style={styles.itemTitle}>Baterias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.2.101:3001/uploads/baterias.svg"/>
            <Text style={styles.itemTitle}>Baterias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.2.101:3001/uploads/baterias.svg"/>
            <Text style={styles.itemTitle}>Baterias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.2.101:3001/uploads/baterias.svg"/>
            <Text style={styles.itemTitle}>Baterias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.2.101:3001/uploads/baterias.svg"/>
            <Text style={styles.itemTitle}>Baterias</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <SvgUri width={42} height={42} uri="http://192.168.2.101:3001/uploads/baterias.svg"/>
            <Text style={styles.itemTitle}>Baterias</Text>
          </TouchableOpacity>
        </ScrollView>        
      </View>
    </>
  );
}

export default CollectPoints;
