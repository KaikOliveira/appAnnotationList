import React, {useState, useReducer} from 'react';

import { 
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from 'react-native';

import {sha256} from 'react-native-sha256';

 export const Main = () => {

    const initialSate = [];
    
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return [...state, action.item];
            case 'CHECK':
                return state.map(item => {
                    if (item.id === action.id){
                        return {...item, check: !item.check};
                    } else {
                        return item;
                    }
                });
            case 'REMOVE':
                return state.filter(item => {
                    return item.id !== action.id;
                });
            default:
                return state;
        }
    };

    const [product, setProduct] = useState('');

    const [state, dispatch] = useReducer (reducer, initialSate);


    return(
      
        <View style={styles.container}>
            


            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="Adicionar produto"
                    value={product}
                    onChangeText={text => {
                        setProduct(text);
                    }}
                />
                <TouchableOpacity 
                style={styles.addButton}
                onPress={ async () => {
                    const hasId = await sha256(product);
                    dispatch({
                        type: 'ADD',
                        item: {
                            id:hasId,
                            title:product,
                            check: false,
                        },
                    });
                    
                    setProduct('');
                }}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>

            </View>

        <FlatList
         data={state}
         renderItem={({item}) => (
        <View style={styles.itemsContainer}>
            <TouchableOpacity
                style={styles.itemCheckButton}
                onPress={() => {
                    dispatch({
                        type: 'CHECK',
                        id: item.id,
                    });
                }} >
                <Text 
                    style={[
                        styles.listItem,
                        item.check ? styles.listItemChecked : '',
                    ]}> { item.title }
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.removeItem}
                onPress={() => {
                    dispatch({
                        type:'REMOVE',
                        id: item.id,
                    });
                }}>
                <Text style={styles.removeItemText}>Remover</Text>
            </TouchableOpacity>
            </View>
         )}
        />

        </View>
    
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#000',
        flex:1,
    },
    inputContainer:{
        backgroundColor:'#fff9c4',
        flexDirection:'row',
        margin: 10,
    },
    input:{
        flex:1,
        fontSize:30,
        color: '#000',
        fontWeight:'bold'
    },
    addButton:{
        
        marginHorizontal:5,
        alignItems:'center',
        alignSelf:'center',
        alignContent:'space-between',
        
        
    },
    addButtonText:{
        textAlign:'center',
        color:'red',
        fontSize:50,
        fontWeight:'bold'
    },
    listItem:{
        backgroundColor:'#fff59d',
        color:'#000',
        fontSize:22,
        padding:10,
        marginHorizontal:7,
        marginVertical:3,
        fontWeight:'bold'
    },
    itemsContainer:{
        flexDirection:'row'
    },
    listItemChecked: {
        textDecorationLine: 'line-through',
        color:'#f44336'
    },
    removeItem:{
        alignItems:'center',
        alignSelf:'center',
        marginHorizontal: 10,
        backgroundColor:'#f44336',
        fontSize:22,
        padding:10,
    },
    itemCheckButton:{
        flex:1,
    },
    removeItemText:{
        fontSize: 18,
        color: '#000',
        fontWeight:'bold'
    }
})