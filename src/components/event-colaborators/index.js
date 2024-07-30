import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Avatar, Icon } from 'react-native-elements';
import materials from "../../data/materials.json"; 
import users from "../../data/users.json"; 

const MaterialColaborators = () => {
  const [expandedUsuarios, setExpandedUsuarios] = useState({});

  const getUserById = (id) => {
    return users.usuarios.find(user => user.id === id);
  };

  const toggleUsuarioSection = (usuario) => {
    setExpandedUsuarios((prev) => ({
      ...prev,
      [usuario]: !prev[usuario],
    }));
  };

  return (
    <ScrollView style={styles.container}>
      {materials.map((section, index) => (
        <View key={index}>
          <Text style={styles.materialTitle}>{section.material}</Text>
          {section.usuarios.map((usuario, idx) => {
            const user = getUserById(usuario.id); 
            return (
              <View key={idx}>
                <ListItem containerStyle={styles.listItem} bottomDivider={false}>
                  <Avatar source={{ uri: user.imagem }} rounded size="medium" />
                  <ListItem.Content style={styles.listItemContent}>
                    <ListItem.Title style={styles.userName}>
                      <Text style={styles.userNameBold}>{user.nome.split(' ')[0]}</Text>
                      <Text style={styles.userNameNormal}>{` ${user.nome.split(' ').slice(1).join(' ')}`}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.userCount}>
                      {usuario.associados.length}/{user.capacidade}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  {usuario.associados.length > 0 && (
                    <TouchableOpacity onPress={() => toggleUsuarioSection(user.nome)}>
                      <Icon
                        name={expandedUsuarios[user.nome] ? 'expand-less' : 'expand-more'}
                        type='material'
                        color='#000'
                      />
                    </TouchableOpacity>
                  )}
                </ListItem>
                {expandedUsuarios[user.nome] && (
                  usuario.associados.map((associadoId, idx) => {
                    const associado = getUserById(associadoId.id); 
                    return (
                      <View key={idx} style={styles.associadoItem}>
                        <Avatar source={{ uri: associado.imagem }} rounded size="small" />
                        <Text style={styles.associadoName}>{associado.nome}</Text>
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
