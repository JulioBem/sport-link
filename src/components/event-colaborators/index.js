import React, { useState } from 'react';  
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';  
import { AntDesign } from '@expo/vector-icons';  
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

  const renderParticipants = (participants) => (  
    <FlatList  
      data={participants}  
      keyExtractor={(item) => item.id}  
      renderItem={({ item }) => (  
        <View style={styles.participantContainer}>  
          <Image source={{ uri: item.profilePicture }} style={styles.participantImage} />  
          <Text style={styles.participantName}>{item.name}</Text>  
        </View>  
      )}  
    />  
  );  

  const renderMaterial = (material) => (  
    <View key={material.id} style={styles.materialContainer}>  
      <View style={styles.ownerContainer}>  
        <Image source={{ uri: material.owner.profilePicture }} style={styles.ownerImage} />  
        <Text style={styles.ownerName}>{material.owner.name} {material.name}</Text>  
        <Text style={styles.materialDisponibility}>{material.participants.length}/{material.maxQuantity}</Text>  
        <TouchableOpacity onPress={() => toggleMaterial(material.id)}>  
          <AntDesign name={expandedMaterials[material.id] ? 'up' : 'down'} />  
        </TouchableOpacity>  
      </View>  
      {expandedMaterials[material.id] && (  
        <View>  
          {renderParticipants(material.participants)}  
        </View>  
      )}  
    </View>  
  );  

  const renderSection = (section, materials) => (  
    <View key={section} style={styles.sectionContainer}>  
      <Text style={styles.sectionTitle}>{section}</Text>  
      {materials.map((material) => renderMaterial(material))}  
    </View>  
  );  

  if (!event) {  
    return <Text>Evento não encontrado</Text>;  
  }  

  return (  
    <ScrollView style={styles.eventContainer}>  
      {event.expenses.equipment.length > 0 && renderSection('Equipamentos', event.expenses.equipment)}  
      {event.expenses.transport.length > 0 && renderSection('Transportes', event.expenses.transport)}  
    </ScrollView>  
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
        width: 335.18,  
        height: 50,  
        marginBottom: 12,   
        marginHorizontal: 17,  
        borderRadius: 100,   
        flexDirection: 'row',  
        alignItems: 'center',  
      },  
    ownerImage: {  
      width: 50,  
      height: 50,  
      borderRadius: 25,  
      marginRight: 12,  
    },  
    ownerName: {  
      fontSize: 16,  
      color: '#333',  
      flex: 1,  
    },  
    materialDisponibility: {
        height: 18,
        fontSize: 15,
        fontWeight: "300",
        lineHeight: 18.29,
        textAlign: "left",
    },
    participantContainer: {  
        width: 167,  
        height: 40,  
        marginBottom: 8,  
        marginHorizontal: 67,  
        borderRadius: 50,  
        flexDirection: 'row',  
        alignItems: 'center',  
      },  
    participantImage: {  
      width: 40,  
      height: 40,  
      borderRadius: 20,  
      marginRight: 8,  
    },  
    participantName: {  
      fontSize: 14,  
      color: '#333',  
    },  
    participantDetails: {  
      fontSize: 12,  
      color: '#666',  
    },  
  });  
  
  export default MaterialColaborators;



