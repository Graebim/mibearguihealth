import React, { useState, useRef  } from "react";
import { 
  View,
  Text,
  TextInput, 
  TouchableOpacity, 
  Vibration,
  Pressable,
  Keyboard, } from "react-native";
import ResultImc from "./Resultimc/";
import styles from "./style";

export default function Form(props) {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState(null);
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErroMessage] = useState(null);

  const heightInputRef = useRef(null);
  const weightInputRef = useRef(null);

  function imcCalculator() {
    if (height !== null && weight !== null) {
      const heightFloat = parseFloat(height.replace(',', '.'));
      const weightFloat = parseFloat(weight.replace(',', '.'));
      const imcValue = weightFloat / (heightFloat * heightFloat);
      setImc(imcValue.toFixed(2));
      return;
    }
    setImc(null);
  }

  function verificationImc(){
    if(imc == null){
      Vibration.vibrate();
      setErroMessage("Campo obrigatório*")
    }
  }

  function validationImc() {
    if (weight !== null && height !== null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu imc é igual:");
      setTextButton("Calcular novamente");
      setErroMessage(null);

      heightInputRef.current.blur();
      weightInputRef.current.blur();
      
    }
    else{
      verificationImc()
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e a altura");
    }
  }

  return (
      <View style={styles.formContext}>
        {imc == null ?
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Ex: 1.75"
          keyboardType="numeric"
          ref={heightInputRef} 
        />

        <Text style={styles.formLabel}>Peso</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex: 75.365"
          keyboardType="numeric"
          ref={weightInputRef}
        />

        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => {
            validationImc();
          }}
        >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </Pressable>
      : 
      <View style={styles.exhibitionResultImc}>
        <ResultImc messageResultImc={messageImc} resultImc={imc} />
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => {validationImc()}}
        >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      }
    </View>
  );
}
