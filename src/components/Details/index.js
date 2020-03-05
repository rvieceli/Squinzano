import React from 'react';

import uberx from '../../assets/uberx.png';
import {
  Container,
  Title,
  Description,
  Image,
  RequestButton,
  RequestButtonText,
} from './styles';

export default function Details() {
  return (
    <Container>
      <Title>Popular</Title>
      <Description>Viagens baratas para o dia a dia</Description>

      <Image source={uberx} />
      <Title>Uberx</Title>
      <Description>R$ 6,00</Description>

      <RequestButton onPress={() => {}}>
        <RequestButtonText>SOLICITAR UBERX</RequestButtonText>
      </RequestButton>
    </Container>
  );
}
