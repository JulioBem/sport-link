import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import events from '../../data/events.json'; 

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

  const renderUserItem = ({ item: usuario }) => {
    const user = getUserById(usuario.id); 
    return (
      <View>
        <View style={styles.listItem}>
          <Image 
            source={{ uri: user.profilePicture }} 
            style={styles.avatar} 
          />
          <View style={styles.listItemContent}>
            <View>
              <Text style={styles.userName}>
                <Text style={styles.userNameBold}>{user.name.split(' ')[0]}</Text>
                <Text style={styles.userNameNormal}>{` ${user.name.split(' ').slice(1).join(' ')}`}</Text>
              </Text>
              <Text style={styles.userCount}>
                {usuario.associados.length}/{usuario.capacidade}
              </Text>
            </View>
            {usuario.associados.length > 0 && (
              <TouchableOpacity onPress={() => toggleUsuarioSection(user.name)}>
                <Text style={styles.expandIcon}>
                  {expandedUsuarios[user.name] ? '−' : '+'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {expandedUsuarios[user.name] && (
          usuario.associados.map((associadoId, idx) => {
            const associado = getUserById(associadoId.id); 
            return (
              <View key={idx} style={styles.associadoItem}>
                <Image 
                  source={{ uri: associado.profilePicture }} 
                  style={styles.smallAvatar} 
                />
                <Text style={styles.associadoName}>{associado.name}</Text>
              </View>
            );
          })
        )}
        <View style={styles.userSpacing} />
      </View>
    );
  };

  const renderMaterialSection = ({ item: section }) => (
    <View>
      <Text style={styles.materialTitle}>{section.material}</Text>
      <FlatList
        data={section.usuarios}
        renderItem={renderUserItem}
        keyExtractor={(item, idx) => item.id.toString() + idx}
        ListFooterComponent={<View style={styles.separator} />}
      />
    </View>
  );

  return (
    <FlatList
      data={eventData.materials}
      renderItem={renderMaterialSection}
      keyExtractor={(item, idx) => item.material + idx}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  materialTitle: {
    fontSize: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: '#000',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  smallAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
  expandIcon: {
    fontSize: 18,
    color: '#000',
  },
});

export default MaterialColaborators;
