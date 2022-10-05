
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';

import {GameController} from 'phosphor-react-native'
import { styles,  } from './styles';

export interface DuoCardProps {
  id: string,
  hourEnd: string,
  hourStart: string,
  name: string,
  useVoiceChannel: boolean,
  weekDays: string[],
  yearsPlaying: number,
}

interface Props {
  data: DuoCardProps;
  onConnet: () => void;
}

export function DuoCard({data, onConnet}: Props ) {
  return (
    <View style={styles.container}>
      <DuoInfo label='Nome' value={data.name}/>
      <DuoInfo label='Tempo de Jogo' value={`${data.yearsPlaying} anos`}/>
      <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dias \u2022 ${data.hourEnd} - ${data.hourEnd}`}/>
      <DuoInfo label='Chamada de áudio?' value={data.useVoiceChannel? "sim": "nao" } colorValue ={data.useVoiceChannel? THEME.COLORS.SUCCESS: THEME.COLORS.ALERT}/>
      
      <TouchableOpacity style={styles.button} onPress={onConnet}>
        <GameController color={THEME.COLORS.TEXT} size={20}/>
        <Text style={styles.buttonTitle}>
          Conectar!
        </Text>

      </TouchableOpacity>
     
    </View>
  );
}