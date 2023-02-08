import { StyleSheet, View } from 'react-native';
import CurrencyToEuro from './components/CurrencyToEuro';

export default function App() {
  return (
    <View style={styles.container}>
      <CurrencyToEuro />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});