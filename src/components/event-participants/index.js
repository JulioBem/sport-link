import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import events from "../../data/events.json";

const ParticipantList = ({ eventId }) => { 
  // Filtra o evento com base no ID
  const eventData = events.find(event => event.id === eventId);

  if (!eventData) {
    return (
      <View style={styles.container}>
        <Text>Evento não encontrado</Text>
      </View>
    );
  }

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => {
    const [firstName, ...restOfName] = item.name.split(' ');
    return (
      <View style={styles.participantContainer}>
        <Image source={{ uri: item.profilePicture }} style={styles.avatar} />
        <Text style={styles.name}>
          <Text style={styles.boldName}>{firstName} </Text>
          {restOfName.join(' ')}
        </Text>
      </View>
    );
  };

  // Dados da lista, começando pelo autor e depois os participantes
  const data = [
    {
      ...eventData.author,
      name: `${eventData.author.name} 👑`, 
    },
    ...eventData.participants
  ];

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  participantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24, 
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    color: '#333',
  },
  boldName: {
    fontWeight: 'bold',
  },
});

export default ParticipantList;
