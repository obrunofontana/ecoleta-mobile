import React, { useState, useEffect} from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
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
interface CollectPointsResponse {
  id: number,
  name: string,
  image: string
  latitude: number
  longitude: number
}

interface RouteParams {
  uf: string;
  city: string
}

const CollectPoints: React.FC = () => {
  // Stados
  const [items, setItems] = useState<ItemResponse[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [collectPoints, setCollectPoints] = useState<CollectPointsResponse[]>([]);

  const route = useRoute();
  const routeParams = route.params as RouteParams;

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

  function handleNavigateToDetail(id: number) {
    navitagion.navigate('Details', {pointId: id});
  }

  useEffect(() => {
    api.get('collectPoints', { 
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems
      }
    }).then((response) => {
        setCollectPoints(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedItems]);

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
            {collectPoints.map((point) => {
              return (
                <Marker 
                  key={String(point.id)}
                  style={styles.mapMarker}
                  coordinate={{latitude: point.latitude, longitude: point.longitude}}
                  onPress={() => handleNavigateToDetail(point.id)}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image  
                      style={styles.mapMarkerImage}
                      source={{ uri: point.image }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              );
            })}
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
