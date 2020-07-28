import React from 'react';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import { RectButton } from 'react-native-gesture-handler';
import { 
  View, 
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';

import styles from './styles';
const Details: React.FC = () => {
  const navitagion = useNavigation();

    // Funções pra navegação
    function handleNavigateToBack() {
      navitagion.goBack();
    }
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateToBack}>
          <Icon name="arrow-left" color="#34cb79" size={20}/>
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: 'https://images.unsplash.com/photo-1441123285228-1448e608f3d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'}} />
        <Text style={styles.pointName}>Mercadao Brunao</Text>
        <Text style={styles.pointItems}>Lampadas, baterias, Oleo de cozinha</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Pato Branco, PR</Text>
        </View> 
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button}>
          <FAIcon name="whatsapp" color="#fff" size={20}/>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button}>
          <Icon name="mail" color="#fff" size={20}/>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

export default Details;
