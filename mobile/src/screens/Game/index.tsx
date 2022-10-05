import React, { useEffect, useState } from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute, useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { THEME } from '../../theme';
import { styles } from './styles';
import { GameParams } from '../../@types/navegation';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import {Entypo} from '@expo/vector-icons'
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';



export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const route = useRoute();
  const game = route.params as GameParams;

  const navegation = useNavigation();

  function handleGoBack(){
    navegation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.0.86:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data));
  }, [])

  return (
    <Background>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} SIZE={20}/>

          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo}/>

          <View style={styles.right}/>
          </View>

          <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode="cover"/>
          <Heading title={game.title} subtitle="Conecte-se e comece a jogar!"/>

          <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem = {({item}) => (
            <DuoCard data={item} onConnet={() => {}}/>
          )} 
          horizontal
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.contentListeVazia]}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={() => (
            <Text style={styles.listaVazia}>
              Sem anuncios para este jogo ainda!
            </Text>
          )}
          />
        </SafeAreaView>
    </Background>
    
  );
}