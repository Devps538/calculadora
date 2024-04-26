import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default function App() {
  const [state, setState] = useState(initialState);

  const addDigit = n => {
    const clearDisplay = state.displayValue === '0' || state.clearDisplay;

    if (n === '.' && !clearDisplay && state.displayValue.includes('.')) {
      return;
    }

    const currentValue = clearDisplay ? '' : state.displayValue;
    const newDisplayValue = currentValue + n;

    setState(prevState => ({
      ...prevState,
      displayValue: newDisplayValue,
      clearDisplay: false,
    }));

    if (n !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const newValues = [...state.values];
      newValues[state.current] = newValue;

      setState(prevState => ({
        ...prevState,
        values: newValues,
      }));
    }
  };

  const clearMemory = () => {
    setState(initialState);
  };

  const setOperation = operation => {
    if (operation === '=') {
      try {
        const result = eval(`${state.values[0]} ${state.operation} ${state.values[1]}`);
        setState(prevState => ({
          ...prevState,
          displayValue: result.toString(),
          operation: null,
          current: 0,
          clearDisplay: true,
          values: [result, 0],
        }));
      } catch (error) {
        console.error('Error during operation:', error);
        clearMemory();
      }
    } else {
      setState(prevState => ({
        ...prevState,
        operation,
        current: 1,
        clearDisplay: true,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <Display value={state.displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={() => setOperation("/")} />
        <Button label="7" onClick={() => addDigit('7')} />
        <Button label="8" onClick={() => addDigit('8')} />
        <Button label="9" onClick={() => addDigit('9')} />
        <Button label="*" operation onClick={() => setOperation("*")} />

        <Button label="4" onClick={() => addDigit('4')} />
        <Button label="5" onClick={() => addDigit('5')} />
        <Button label="6" onClick={() => addDigit('6')} />
        <Button label="-" operation onClick={() => setOperation("-")} />
        <Button label="1" onClick={() => addDigit('1')} />
        <Button label="2" onClick={() => addDigit('2')} />
        <Button label="3" onClick={() => addDigit('3')} />
        <Button label="+" operation onClick={() => setOperation("+")} />
        <Button label="0" double onClick={() => addDigit('0')} />
        <Button label="." onClick={() => addDigit('.')} />
        <Button label="=" operation onClick={() => setOperation("=")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
