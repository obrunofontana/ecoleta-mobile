import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Image, 
  Text,
  ImageBackground,
} from 'react-native';

import styles from './styles';

const Home: React.FC = () => {
  const navitagion = useNavigation();

  function handleNavigateToCollectPoints() {
    navitagion.navigate('CollectPoints');
  }

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
