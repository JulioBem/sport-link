import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Pressable,
  ToastAndroid,
  Platform,
} from "react-native";
import AddImageIcon from "../../../../assets/images/icone-upload.png";
import CommunityHeader from "../../../components/community-header";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";

// eslint-disable-next-line no-undef
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export default function EditarEvento() {
  const { event } = useLocalSearchParams();
  const router = useRouter();

  const {
    id,
    title,
    description: eventCurrentDescription,
    date: eventCurrentDate,
    capacity: eventCurrentCapacity,
    location: eventCurrentLocation,
    materials: eventCurrentMaterials,
    difficulty,
  } = JSON.parse(event);

  const [eventName, setEventName] = useState(title);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState(eventCurrentCapacity);
  const [location, setLocation] = useState(eventCurrentLocation?.address);
  const [description, setDescription] = useState(eventCurrentDescription);
  const [materials, setMaterials] = useState(eventCurrentMaterials);
  const [currentMaterial, setCurrentMaterial] = useState("");
  const [isBeginner, setIsBeginner] = useState(
    difficulty.includes("Iniciante")
  );
  const [isAdvanced, setIsAdvanced] = useState(difficulty.includes("Avançado"));
  const [date, setDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const onChangeStartTime = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setStartTime(
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  };

  const onChangeEndTime = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setEndTime(
        selectedTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }
  };

  const addMaterial = () => {
    if (currentMaterial.trim() !== "") {
      setMaterials([...materials, { name: currentMaterial }]);
      setCurrentMaterial("");
    }
  };

  const showToast = (message) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
  };

  const createEvent = async () => {
    const currentUserId = "TESTE123";

    const combineDateAndTime = (date, time) => {
      if (!date || !time) return null;

      const [timePart, meridian] = time.split(" ");
      const [hour, minute] = timePart.split(":").map(Number);

      let adjustedHour = hour;
      if (meridian === "PM" && hour !== 12) {
        adjustedHour += 12;
      } else if (meridian === "AM" && hour === 12) {
        adjustedHour = 0;
      }

      const combinedDate = new Date(date);
      combinedDate.setHours(adjustedHour);
      combinedDate.setMinutes(minute);

      return combinedDate.toISOString();
    };

    const difficulty = isBeginner
      ? "Iniciante"
      : isAdvanced
        ? "Avançado"
        : isBeginner && isAdvanced
          ? "Iniciante/Avançado"
          : difficulty;

    const newEvent = {
      title: eventName ?? title,
      capacity: capacity ?? eventCurrentCapacity,
      description: description ?? eventCurrentDescription,
      location: {
        address: location,
      },
      date: combineDateAndTime(date, startTime) ?? eventCurrentDate,
      author: {
        id: currentUserId,
        name: "Participante de Teste",
        email: "teste@example.com",
        profilePicture: "https://example.com/profile.jpg",
        chavePix: "teste@example.com",
      },
      difficulty,
      materials: materials ?? eventCurrentMaterials,
    };

    try {
      const response = await fetch(`${apiUrl}/events/id/${id}/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o post");
      }

      showToast(
        "Evento criado com sucesso",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );

      router.back();
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      showToast("Erro", "Não foi possível criar o post.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <CommunityHeader
          communityTitle="Título da Comunidade"
          communitySubtitle="Subtítulo da Comunidade"
          imageURI="image-url-here"
          style={styles.communityHeader} // Adicione um estilo se necessário
        />
        <View style={styles.iconContainer}>
          <Image source={AddImageIcon} style={styles.icon} />
        </View>
        <Image source={{ uri: "image-url-here" }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.label}>Nome do evento</Text>
          <TextInput
            style={styles.nomeevento}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Insira o nome do evento"
          />
          <Text style={styles.label}>Data</Text>
          <View style={styles.dateContainer}>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={{ flex: 1, width: "100%" }}
            >
              <TextInput
                style={styles.dateInput}
                value={date ? date?.toLocaleDateString() : ""}
                placeholder="Insira a data"
                editable={false}
              />
            </Pressable>
            {showDatePicker && (
              <DateTimePicker
                value={date ?? new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
              />
            )}
            <Pressable
              onPress={() => setShowStartTimePicker(true)}
              style={{ flex: 1, width: "100%" }}
            >
              <TextInput
                style={styles.startTimeInput}
                value={startTime}
                placeholder="Início"
                editable={false}
              />
            </Pressable>
            {showStartTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeStartTime}
              />
            )}
            <Pressable
              onPress={() => setShowEndTimePicker(true)}
              style={{ flex: 1, width: "100%" }}
            >
              <TextInput
                style={styles.endTimeInput}
                value={endTime}
                placeholder="Término"
                editable={false}
              />
            </Pressable>
            {showEndTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChangeEndTime}
              />
            )}
          </View>
          <Text style={styles.label}>Local</Text>
          <TextInput
            style={styles.inputlugar}
            value={location}
            onChangeText={setLocation}
            placeholder="Insira o local"
          />
          <Text style={styles.label}>Capacidade do evento</Text>{" "}
          {/* Novo rótulo */}
          <TextInput
            style={styles.inputCapacidade} // Reutilizando o estilo existente
            value={capacity}
            onChangeText={setCapacity}
            placeholder="Insira a capacidade"
            keyboardType="numeric" // Configurando o teclado para números
          />
          <Text style={styles.label}>Descrição do evento</Text>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Insira a descrição do evento"
            multiline
          />
          <Text style={styles.label}>Materiais necessários</Text>
          {materials.map((material, index) => (
            <View key={index} style={styles.materialItem}>
              <Text style={styles.materialText}>{material.name}</Text>
            </View>
          ))}
          <TextInput
            style={styles.inputlocal}
            value={currentMaterial}
            onChangeText={setCurrentMaterial}
            placeholder="Adicionar opção..."
            onSubmitEditing={addMaterial}
          />
          <Text style={styles.label}>Nível dos participantes</Text>
          <View style={styles.levelContainer}>
            <Text>Iniciantes</Text>
            <Switch
              value={isBeginner}
              onValueChange={setIsBeginner}
              style={styles.toggle}
            />
            <Text>Avançados</Text>
            <Switch
              value={isAdvanced}
              onValueChange={setIsAdvanced}
              style={styles.toggle}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => createEvent()}>
          <Text style={styles.buttonText}>Confirmar Alterações</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSpace} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 150, // Espaço extra no final do ScrollView para acomodar o ícone e o botão
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  label: {
    fontSize: 17,
    marginBottom: 8,
  },
  inputlocal: {
    height: 40,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    placeholderTextColor: "grey",
  },
  inputlugar: {
    height: 40,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    placeholderTextColor: "grey",
  },
  dateInput: {
    height: 40,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginRight: 5,
    placeholderTextColor: "grey",
  },
  startTimeInput: {
    height: 40,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    marginRight: 5,
    placeholderTextColor: "grey",
  },
  endTimeInput: {
    height: 40,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    placeholderTextColor: "grey",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textArea: {
    height: 80,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    placeholderTextColor: "grey",
  },
  button: {
    backgroundColor: "#2260a8",
    borderRadius: 9,
    width: "90%",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 20,
    alignSelf: "center",
    bottom: -50,
    zIndex: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    zIndex: 2,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 75, // Ajuste a posição conforme necessário
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 2,
  },
  bottomSpace: {
    height: 90, // Altura da área em branco
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: -5 }, // A sombra estará acima
    shadowOpacity: 0.3,
    shadowRadius: 5, // Sombra para Android
    elevation: 5, // Elevação para criar uma sombra no Android
    zIndex: 1, // Garante que a sombra esteja sobre outros componentes
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "absolute",
    zIndex: 3, // Garante que o ícone fique acima dos outros componentes
    top: 110, // Ajuste a posição conforme necessário
    right: 3, // Ajuste a posição conforme necessário
  },
  icon: {
    width: 46,
    height: 46,
  },
  nomeevento: {
    height: 40,
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    placeholderTextColor: "grey",
  },
  materialItem: {
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 8, // Ajusta o padding vertical para adequar ao tamanho do texto
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    marginLeft: 20,
    marginRight: 20,
    flexShrink: 1, // Permite que o item encolha para caber no espaço disponível
  },
  materialText: {
    fontSize: 16,
    flexWrap: "wrap", // Permite a quebra de linha do texto
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggle: {
    marginHorizontal: 10,
  },
  inputCapacidade: {
    height: 40,
    width: "100%",
    borderColor: "#f1f1f1",
    borderWidth: 1,
    borderRadius: 9,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f1f1f1",
    placeholderTextColor: "grey",
  },
});
