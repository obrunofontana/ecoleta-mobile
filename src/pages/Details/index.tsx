import React, { useState, useEffect } from 'react';
import { Feather as Icon, FontAwesome as FAIcon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as MailComposer from 'expo-mail-composer';
import { 
  View, 
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';

interface RouteParams {
  pointId: number
}
interface DataResponse {
  point:{
    name: string;
    email: string;
    image: string;
    whatsapp: string;
    city: string;
    uf: string;
  }
  items: {
    title: string;
  }[];
}

import styles from './styles';
import api from '../../services/api';

const Details: React.FC = () => {
  const navitagion = useNavigation();
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [data, setData] = useState<DataResponse>({} as DataResponse);

  // Funções pra navegação
  function handleNavigateToBack() {
    navitagion.goBack();
  }

  function handleComposeMail() {
    MailComposer.composeAsync({
      subject: 'Interesse em depositar residuos',
      recipients: [data.point.email]
    });
  }

  function handleSendMessageWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse em depositar resíduos!!`);
  }

  useEffect(() => {
    api.get(`collectPoints/${routeParams.pointId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((e) => {
        console.log(e);
      })

  }, []);

  if(!data.point) {
    // TODO: Mostrar um loading
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateToBack}>
          <Icon name="arrow-left" color="#34cb79" size={20}/>
        </TouchableOpacity>

        <Image style={styles.pointImage} source={{ uri: data.point.image}} />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View> 
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleSendMessageWhatsApp}>
          <FAIcon name="whatsapp" color="#fff" size={20}/>
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={handleComposeMail}>
          <Icon name="mail" color="#fff" size={20}/>
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
}

export default Details;
