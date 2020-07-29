import React, { useState, useEffect} from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { 
  View, 
  Image, 
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import styles from './styles';

interface IBGEUFResponse {
  sigla: string;
  label: string;
  value: string;
}


interface IBGECityResponse {
  nome: string
  label: string;
  value: string;
}

const Home: React.FC = () => {
  const navitagion = useNavigation();

  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>();
  const [selectedCity, setSelectedCity] = useState<string>();

  function handleNavigateToCollectPoints() {
    navitagion.navigate('CollectPoints', {
      uf: selectedUf,
      city: selectedCity
    });
  }

  function handleSelectedUf(uf: string) {
    if(!uf) { return; }
    setSelectedUf(uf);
  }

  function handleSelectedCity(city: string) {
    if(!city) { return; }
    setSelectedCity(city);
  }

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        const serializeUfItems = response.data.map((uf) => {
          return {
            label: uf.sigla,
            value: uf.sigla,
            sigla: uf.sigla,
          }
        });
        setUfs(serializeUfItems);
      })
      .catch((e) => {        
        console.log('Error :: Home :: useEffect :: uf', e);
      });

  }, []);

  useEffect(() => {
    if (!selectedUf) { return; }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then((response) => {
        console.log('ops')
        const cityNames = response.data.map((city) => {
          return {
            label: city.nome,
            value: city.nome,
            nome: city.nome
          }
        });
        setCities(cityNames);
      })
      .catch((e) => {        
        console.log('Error :: Home :: useEffect :: uf', e);
      });
  }, [selectedUf]);

  return(
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{ width: 274, height: 368}}      
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.footer}>
      <RNPickerSelect
         placeholder={{
          label: 'Seleciona a UF',
          value: null,
        }}
        onValueChange={(value) => handleSelectedUf(value)}
        items={ufs}
      />
      <RNPickerSelect
         placeholder={{
          label: 'Seleciona a cidade',
          value: null,
        }}
        onValueChange={(value) => handleSelectedCity(value)}
        items={cities}
      />

        <RectButton style={styles.button} onPress={handleNavigateToCollectPoints}>
          <View style={styles.buttonIcon}>
            <Text> 
              <Icon name="arrow-right" color="#FFF" size={24}/>
            </Text>
          </View>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}
export default Home;
