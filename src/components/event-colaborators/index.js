import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import events from '../../data/events.json';

const MaterialColaborators = ({ eventId }) => {
  const [expandedMaterials, setExpandedMaterials] = useState({});

  const event = events.find(event => event.id === eventId);

  const toggleMaterial = (materialId) => {
    setExpandedMaterials((prev) => ({
      ...prev,
      [materialId]: !prev[materialId],
    }));
  };

  const formatName = (fullName) => {
    const names = fullName.split(' ');
    const firstName = names.shift(); // Remove o primeiro nome do array e armazena
    const lastName = names.join(' '); // Junta o restante do array em um único string
    return { firstName, lastName };
  };

  const renderParticipants = (participants) => (
    <FlatList
      data={participants}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const { firstName, lastName } = formatName(item.name);
        return (
          <View style={styles.participantContainer}>
            <Image source={{ uri: item.profilePicture }} style={styles.participantImage} />
            <View style={styles.participantTextContainer}>
              <Text style={styles.participantName}>
                <Text style={styles.bold}>{firstName}</Text>
              </Text>
              <Text style={styles.participantName}>{lastName}</Text>
            </View>
          </View>
        );
      }}
    />
  );

  const renderMaterial = (material) => (
    <View key={material.id} style={styles.materialContainer}>
      <TouchableOpacity
        onPress={() => toggleMaterial(material.id)}
        style={styles.ownerContainer}
        activeOpacity={0.85}
      >
        <Image source={{ uri: material.owner.profilePicture }} style={styles.ownerImage} />
        <View style={styles.ownerInfo}>
          {formatName(material.owner.name).firstName && (
            <Text style={styles.ownerName}>
              <Text style={styles.bold}>{formatName(material.owner.name).firstName}</Text> {formatName(material.owner.name).lastName}
            </Text>
          )}
          <Text style={styles.materialName}>{material.name}</Text>
        </View>
        <Text style={styles.materialDisponibility}>{material.participants.length}/{material.maxQuantity}</Text>
        <Icon
          name={expandedMaterials[material.id] ? 'angle-up' : 'angle-down'}
          type='font-awesome'
          color='rgba(196, 196, 196, 1)'
          size={20}
          containerStyle={styles.iconContainer}
        />
      </TouchableOpacity>
      {expandedMaterials[material.id] && (
        <View>
          {renderParticipants(material.participants)}
        </View>
      )}
    </View>
  );

  const renderSection = ({ item }) => (
    <View key={item.title} style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      {item.data.map((material) => renderMaterial(material))}
    </View>
  );

  const sections = [
    { title: 'Equipamentos', data: event.expenses.equipment },
    { title: 'Transportes', data: event.expenses.transport },
  ].filter(section => section.data.length > 0);

  if (!event) {
    return <Text>Evento não encontrado</Text>;
  }

  return (
    <FlatList
      style={styles.eventContainer}
      data={sections}
      keyExtractor={(item) => item.title}
      renderItem={renderSection}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    height: 20,
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 20,
    marginBottom: 8,
    color: '#333',
  },
  ownerContainer: {
    width: '100%',
    height: 50,
    marginBottom: 12,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  ownerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  ownerInfo: {
    flex: 1,
  },
  ownerName: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  materialName: {
    fontSize: 12,
    color: '#999',
    fontWeight: '300',
  },
  materialDisponibility: {
    height: 18,
    fontSize: 15,
    fontWeight: '300',
    lineHeight: 18.29,
    textAlign: 'left',
    marginRight: 10,
    color: 'rgba(0, 0, 0, 1)',
  },
  participantContainer: {
    width: '100%',
    height: 50, // Ajustado para reduzir o espaçamento vertical
    marginBottom: 4, // Reduzido o espaçamento vertical entre os participantes
    paddingHorizontal: 116, // Ajusta o espaçamento horizontal
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantImage: {
    width: 30.51,
    height: 30.51,
    borderRadius: 20,
    marginRight: 8,
  },
  participantTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start', // Alinha o texto à esquerda
    justifyContent: 'center', // Centraliza verticalmente
  },
  participantName: {
    fontSize: 14,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  iconContainer: {
    marginLeft: 10,
    width: 30,
    height: 15.18,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  },
});

export default MaterialColaborators;













