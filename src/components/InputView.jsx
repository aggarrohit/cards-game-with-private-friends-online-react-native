import React from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';

export const InputView = ({
  title,
  placeholder,
  value,
  setValue,
  inputMode,
  maxLength,
  action,
  actionTitle,
}) => {
  return (
    <View style={{marginBottom: 50}}>
      <Text>{title}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.inputField}
        inputMode={inputMode}
        maxLength={maxLength == 0 ? 100 : maxLength}
      />
      <Button onPress={action} title={actionTitle}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderColor: 'blue',
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
});
