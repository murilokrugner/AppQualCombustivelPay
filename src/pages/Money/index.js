import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, ScrollView, Alert} from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import {Container, TextTitle, BoxButton, BoxResult, TextResult, BoxAds} from './styles';

import Button from '../../components/Button';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

/*import {
    AdMobBanner,
  } from 'react-native-admob'*/

function Money() {
    const formRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const [inputLitro, setInputLitro] = useState();
    const [inputPercorrer, setInputPercorrer] = useState();
    const [inputPreco, setInputPreco] = useState();

    const [result, setResult] = useState();
    const [result2, setResult2] = useState();

    function handleSubmit() {
        setLoading(true);

        if (inputLitro === undefined) {
            Alert.alert('Por favor, preenche todos os campos');
            setLoading(false);
            return;
        }
    
        if (inputPercorrer === undefined) {
            Alert.alert('Por favor, preenche todos os campos');
            setLoading(false);
            return;
        }

        if (inputPreco === undefined) {
            Alert.alert('Por favor, preenche todos os campos');
            setLoading(false);
            return;
        }

        const resultLitro = parseFloat(inputPercorrer) / parseFloat(inputLitro);

        const resultValue = resultLitro * parseFloat(inputPreco.slice(2));

        const fixedValueLt = resultLitro.toFixed(2);
        const fixedValue = resultValue.toFixed(2);

        setResult(fixedValueLt.toString());
        setResult2(fixedValue.toString());
       
        setLoading(false);
    }

    function handleClear() {
        setResult();
        setResult2();
        setInputLitro();
        setInputPercorrer();
        setInputPreco();
    }

    return (
        <Container>
            <KeyboardAvoidingView style={{flex: 1}}>
            <ScrollView style={{flex: 1}}>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <TextTitle>Quantos KM o veículo faz por litro? </TextTitle>
                    <TextInputMask
                        type={'only-numbers'}
                        value={inputLitro}
                        onChangeText={text => {
                            setInputLitro(text);
                        }}                        
                        style={{
                            backgroundColor: '#FAFBFD',
                            width: 350,
                            borderRadius: 20,
                            padding: 15,
                            fontSize: 18,
                            color: '#000',
                        }}
                        placeholder={'Exemplo: 10'}
                        placeholderTextColor={'#000'}

                        />    
                    <TextTitle>Quantos KM irá percorrer?</TextTitle>
                    <TextInputMask
                        type={'only-numbers'}
                        value={inputPercorrer}
                        onChangeText={text => {
                            setInputPercorrer(text);
                        }}                        
                        style={{
                            backgroundColor: '#FAFBFD',
                            width: 350,
                            borderRadius: 20,
                            padding: 15,
                            fontSize: 18,
                            color: '#000',
                        }}
                        placeholder={'Exemplo: 100'}
                        placeholderTextColor={'#000'}

                        />
                    <TextTitle>Valor do combustível</TextTitle>
                    <TextInputMask
                        type={'money'}
                        value={inputPreco}
                        onChangeText={text => {
                            setInputPreco(text);
                        }}
                        options={{
                            precision: 2,
                            separator: '.',
                            delimiter: '.',
                            unit: 'R$',
                            suffixUnit: '',
                        }}
                        style={{
                            backgroundColor: '#FAFBFD',
                            width: 350,
                            borderRadius: 20,
                            padding: 15,
                            fontSize: 18,
                            color: '#000',
                        }}
                        placeholder={'Valor R$'}
                        placeholderTextColor={'#000'}

                        /> 
                    <BoxButton>
                        <Button loading={loading} 
                            onPress={() => {formRef.current.submitForm()}} style={{width: 300}}>Calcular</Button>
                        <Button onPress={handleClear} style={{width: 300}}>Limpar</Button>
                    </BoxButton>
                </Form>  
                <BoxResult>                    
                    {result !== undefined && (
                        <>
                            <TextResult>Você irá precisar de: {result}Lts </TextResult>
                            <TextResult>de combustível e</TextResult>
                            <TextResult>irá gastar R$ {result2} reais</TextResult>                            
                        </>
                    )}
                </BoxResult>                
                {/*<BoxAds style={result !==undefined && {marginTop: 30}}>
                    <AdMobBanner
                        adSize="largeBanner"
                        adUnitID="ca-app-pub-2776609991840638/2937855696"                                
                    />
                    </BoxAds>   */}              
            </ScrollView>
            </KeyboardAvoidingView>
        </Container>
    );
}

export default Money;