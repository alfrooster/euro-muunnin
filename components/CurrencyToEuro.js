import { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CurrencyToEuro() {
    const [amount, setAmount] = useState();
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState();
    const [result, setResult] = useState('_');

    let myHeaders = new Headers();
    myHeaders.append("apikey", "k8ci77GD79SRFkWdBXLU1Xg60TOZq2L0");

    const requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };
    
    const fetchConversion = () => {
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
                style={{ width: 180 }}>
                <Picker.Item label="Canadian Dollar" value="CAD" />
                <Picker.Item label="Chinese Yuan" value="CNY" />
                <Picker.Item label="British Pound" value="GBP" />
                <Picker.Item label="Indian Rupee" value="INR" />
                <Picker.Item label="Japanese Yen" value="JPY" />
                <Picker.Item label="South Korean Won" value="KRW" />
                <Picker.Item label="Swedish Krona" value="SEK" />
                <Picker.Item label="United States Dollar" value="USD" />
            </Picker>
            <Button title='Convert' onPress={fetchConversion} />
            <ActivityIndicator animating={loading} />
            <Text style={{ fontSize: 20 }}>{Math.round((result + Number.EPSILON) * 100) / 100} €</Text>
        </View>
    )
}