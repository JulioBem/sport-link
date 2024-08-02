import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import events from '../../data/events.json'; // Atualize o caminho conforme necessário

const MaterialColaborators = ({ eventId }) => {
  const [expandedUsuarios, setExpandedUsuarios] = useState({});

  // Filtra o evento com base no ID
  const eventData = events.find(event => event.id === eventId);

  if (!eventData) {
    return (
      <View style={styles.container}>
        <Text>Evento não encontrado</Text>
      </View>
    );
  }


  
  const getAllUsers = () => {
    // Cria um array com todos os participantes e o autor
    const users = [...eventData.participants];
    
    if (eventData.author) {
      users.push(eventData.author);
    }
    
    return users;
  };
  
  // Exemplo de uso da função para encontrar um usuário por ID
  const getUserById = (id) => {
    const users = getAllUsers();
    return users.find(user => user.id === id);
  };

  // Alterna a seção do usuário
  const toggleUsuarioSection = (usuario) => {
    setExpandedUsuarios((prev) => ({
      ...prev,
      [usuario]: !prev[usuario],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {eventData.materials.map((section, index) => (
        <View key={index}>
          <Text style={styles.materialTitle}>{section.material}</Text>
          {section.usuarios.map((usuario, idx) => {
            const user = getUserById(usuario.id); 
            return (
              <View key={idx}>
                <ListItem containerStyle={styles.listItem} bottomDivider={false}>
                  <Avatar source={{ uri: user.profilePicture }} rounded size="medium" />
                  <ListItem.Content style={styles.listItemContent}>
                    <ListItem.Title style={styles.userName}>
                      <Text style={styles.userNameBold}>{user.name.split(' ')[0]}</Text>
                      <Text style={styles.userNameNormal}>{` ${user.name.split(' ').slice(1).join(' ')}`}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.userCount}>
                      {usuario.associados.length}/{usuario.capacidade}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  {usuario.associados.length > 0 && (
                    <TouchableOpacity onPress={() => toggleUsuarioSection(user.name)}>
                      <Icon
                        name={expandedUsuarios[user.name] ? 'expand-less' : 'expand-more'}
                        type='material'
                        color='#000'
                      />
                    </TouchableOpacity>
                  )}
                </ListItem>
                {expandedUsuarios[user.name] && (
                  usuario.associados.map((associadoId, idx) => {
                    const associado = getUserById(associadoId.id); 
                    return (
                      <View key={idx} style={styles.associadoItem}>
                        <Avatar source={{ uri: associado.profilePicture }} rounded size="small" />
                        <Text style={styles.associadoName}>{associado.name}</Text>
                      </View>
                    );
                  })
                )}
                <View style={styles.userSpacing} />
              </View>
            );
          })}
          <View style={styles.separator} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  materialTitle: {
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#000',
  },
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  listItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    flexDirection: 'row',
  },
  userNameBold: {
    fontWeight: 'bold',
  },
  userNameNormal: {
    fontWeight: 'normal',
  },
  userCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  associadoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    marginHorizontal: 50,
  },
  associadoName: {
    marginLeft: 15,
    fontSize: 14,
    fontWeight: 'normal',
  },
  userSpacing: {
    height: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default MaterialColaborators;

