import React, { useState, useEffect} from 'react';
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

import api from '../../services/api';

import styles from './styles';

interface ItemResponse {
  id: number,
  title: string,
  imageUrl: string
}

const CollectPoints: React.FC = () => {
  // Stados
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filteredItems = selectedItems.filter((item) => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  const navitagion = useNavigation();

  // Funções pra navegação
  function handleNavigateToHome() {
    navitagion.goBack();
  }

  function handleNavigateToDetail() {
    navitagion.navigate('Details');
  }

  useEffect(() => {
    api.get('itemscollect')
      .then((response) => {
        setItems(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
          {items.map((item) => {
            return (
              <TouchableOpacity 
                key={String(item.id)} 
                style={[
                  styles.item,
                  selectedItems.includes(item.id) ? styles.selectedItem : {}
                ]} 
                onPress={() => handleSelectItem(item.id)}>
                <SvgUri width={42} height={42} uri={item.imageUrl}/>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>        
      </View>
    </>
  );
}

export default CollectPoints;
