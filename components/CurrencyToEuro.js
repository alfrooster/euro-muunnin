import { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CurrencyToEuro() {
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState();
    const [result, setResult] = useState('_');
    const [symbols, setSymbols] = useState([]);

    let myHeaders = new Headers();
    myHeaders.append("apikey", "API_KEY"); // insert api key

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    useEffect(() => {
        fetchSymbols();
    }, []);

    const fetchSymbols = () => { // fetching the symbols needed for picker
        fetch(`https://api.apilayer.com/exchangerates_data/symbols`, requestOptions)
        .then(response => response.json())
        .then(data => {
            let object = data.symbols;
            setSymbols(Object.keys(object)); // taking the keys from the symbols objects into an array
        })
        .catch(err => console.error(err))
    }

    const fetchConversion = () => { // using the api to convert from selected currency to eur
        setLoading(true);
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${currency}&amount=${amount}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            setResult(data.result);
            setLoading(false);
        })
        .catch(err => console.error(err))
    }

    return (
        <View>
            <TextInput
                value={amount}
                keyboardType='numeric'
                onChangeText={text => setAmount(text)}
                style={{ borderColor: 'gray', borderWidth: 1, paddingLeft: 5 }}
            />
            <Picker
                selectedValue={currency}
                onValueChange={(itemValue, itemIndex) =>
                    setCurrency(itemValue)
                }
                style={{ width: 100 }}>
                {symbols.map((item, index) => {
                    return(<Picker.Item label={item} value={item} key={index} />) // mapping - symbols to picker item values
                })}
            </Picker>
            <Button title='Convert' onPress={fetchConversion} />
            <ActivityIndicator animating={loading} />
            <Text style={{ fontSize: 20 }}>{Math.round((result + Number.EPSILON) * 100) / 100 /* round result to 2 decimals */} €</Text>
        </View>
    )
}