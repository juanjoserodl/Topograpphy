// 
// AddModal.js
// Topograpphy
// 
// Created by Juan J. Rodríguez López on 19/04/18.
// Copyright 2018 Juan. All rights reserved.
// 


import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, 
    View, Alert, Platform, Dimensions, 
    TextInput, BackHandler, AsyncStorage} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
let dropDownData = [{ value: 'Lindero' }, { value: 'Detalle' }]

export default class AddModal extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    }

    // componentWillReceiveProps() {
    //     this.state = {
    //         PointID: '' ,
    //         PointType: '',
    //         Deg: '',
    //         Min: '',
    //         Seg: '',
    //         Distance1: '',
    //         Distance2: '',
    //         Distance3: '',
    //         Distance4: '',
    //         Distance5: '',
    //         Obs: ''
    //     }
    // } 

    onBackButtonPressAndroid = () => {
        if (this) {
            this.refs.myModal.close()
            return true
        } else {
            return false
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            newPointID: '',
            newPointType: 'Lindero',
            newDeg: '',
            newMin: '',
            newSeg: '',
            newDistance1: '',
            newDistance2: '',
            newDistance3: '',
            newDistance4: '',
            newDistance5: '',
            newObs: ''
        }
    }

    // buttonPressed(){
    //     const arrayData = []
    //     // Validacion de datos if
    //         const newKey = this.generateKey(24);
    //         const newPoint = {
    //             key: newKey,
    //             point: this.state.newPointID,
    //             type: this.state.newPointType,
    //             deg: this.state.newDeg,
    //             min: this.state.newMin,
    //             seg: this.state.newSeg,
    //             distance: this.state.newDistance,
    //             obs: this.state.newObs
    //         }
    //         arrayData.push(newPoint)
    //         try{
    //             AsyncStorage.getItem('database_points').then((value) => {
    //                 if(value !== null){
    //                     const d = JSON.parse(value)
    //                     d.push(newPoint)
    //                     AsyncStorage.setItem('database_points', JSON.stringify(d)).then(() => {
    //                         flatListData.push(newPoint);
    //                         this.props.parentFlatList.refreshFlatList(newKey);
    //                         this.refs.myModal.close();
    //                     })
    //                 } else {
    //                     AsyncStorage.setItem('database_points', JSON.stringify(arrayData)).then(() => {
    //                         flatListData.push(newPoint)
    //                         this.props.parentFlatList.refreshFlatList(newKey)
    //                         this.refs.myModal.close()
    //                     })
    //                 }
    //             })
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     // else     
    // }
    
    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }

    showAddModal = () => {
        this.refs.myModal.open()
    }

    generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }
    
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={styles.addmodal}
                position='bottom'
                backdrop={true}
                onClosed={() => {
                    // this.state = {
                    //     newPointID: '',
                    //     newPointType: 'Lindero',
                    //     newDeg: '',
                    //     newMin: '',
                    //     newSeg: '',
                    //     newDistance1: '',
                    //     newDistance2: '',
                    //     newDistance3: '',
                    //     newDistance4: '',
                    //     newDistance5: '',
                    //     newObs: ''
                    // }
                }}
            >
                <Text style={styles.modaltitle}> Nuevo Punto </Text>

                <View style={styles.subcontainer}>
                    <Text style={styles.modalsubtitles}> Info. Punto </Text>
                    <View style={{flex:4, flexDirection: 'row'}}>
                        <TextInput
                            style={styles.modalinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newPointID: text })}
                            placeholder='No. Punto'
                            value={this.state.newPointID}
                            />

                        <View style={{ flex: 2, marginTop: -25, marginBottom: 3, marginLeft: 10 }}>
                            <Dropdown
                                label='Tipo de Punto'
                                data={dropDownData}
                                onChangeText={(text) => this.setState({ newPointType: text })}
                                value={this.state.newPointType}
                                fontSize={12}
                                labelFontSize={10}
                                animationDuration={100}
                                itemColor={'black'}
                                selectedItemColor={'darkgrey'}
                                />
                        </View>
                    </View>
                </View >

                <View style={styles.subcontainer}>
                    <Text style={styles.modalsubtitles}> Azimut </Text>
                    <View style={{flex:4, flexDirection: 'row'}}>
                        <TextInput
                            style={styles.modalangleinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newDeg: text })}
                            placeholder='Deg'
                            value={this.state.newDeg}
                            />

                        <TextInput
                            style={styles.modalangleinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newMin: text })}
                            placeholder='Min'
                            value={this.state.newMin}
                            />

                        <TextInput
                            style={styles.modalangleinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newSeg: text })}
                            placeholder='Seg'
                            value={this.state.newSeg}
                        />
                    </View>    
                </View >

                <View style={styles.subcontainer}>
                    <Text style={styles.modalsubtitles}> Distancia </Text>
                    <View style={{flex:4, flexDirection: 'row', flexWrap: 'wrap'}}>
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newDistance1: text })}
                            placeholder='ej. 22.123'
                            value={this.state.newDistance1}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newDistance2: text })}
                            placeholder='ej. 22.123'
                            value={this.state.newDistance2}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newDistance3: text })}
                            placeholder='ej. 22.123'
                            value={this.state.newDistance3}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newDistance4: text })}
                            placeholder='ej. 22.123'
                            value={this.state.newDistance4}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ newDistance5: text })}
                            placeholder='ej. 22.123'
                            value={this.state.newDistance5}
                        />  
                    </View>
                </View >

                <View style={styles.subcontainer}>
                    <Text style={styles.modalsubtitles}> Observaciones </Text>
                    <TextInput
                        autoCorrect={false}
                        style={styles.modalobsinput}
                        onChangeText={(text) => this.setState({ newObs: text })}
                        placeholder='Max. 40 char.'
                        keyboardType="default"
                        value={this.state.newObs}
                        maxLength={40}
                    />
                </View >

                <Button
                    style={styles.modalbutton}
                    containerStyle={{
                        padding: 8,
                        marginHorizontal: 40,
                        height: 40,
                        marginTop: 10,
                        borderRadius: 6,
                        backgroundColor: 'mediumseagreen'
                    }}
                    onPress={() => {

                        // for(var i = 0; i < this.state.newDistance1.length; i++){
                        //     if(this.state.newDistance1[i]== ',') {
                        //         alert('coma') 
                        //         i = this.state.newDistance1.length
                        //     }   
                        // }

                        // Point's data validation
                        if(this.state.newPointID == '' || this.state.newDeg == '' || this.state.newMin == '' || this.state.newSeg == '' || this.state.newDistance1 == '' || this.state.newDistance2 == '' || this.state.newDistance3 == '' || this.state.newDistance4 == '' || this.state.newDistance5 == '' ){
                            alert('Existen campos que estan vacios. Ingresa los datos restantes')
                        } else if(this.state.newDeg < 0 || this.state.newMin < 0 || this.state.newSeg < 0){
                            alert('Alguno de los datos es menor al rango permitido')
                        } else if(this.state.newDeg >= 360 || this.state.newMin >= 60 || this.state.newSeg >= 60){
                            alert('Alguno de los datos es mayor o igual al rango permitido')    
                        } else if(this.state.newDistance1.includes(',') || this.state.newDistance2.includes(',') ||                                     this.state.newDistance3.includes(',') || this.state.newDistance4.includes(',') ||                                     this.state.newDistance5.includes(',')){
                            alert('El formato de ingreso de distancias es erroneo. Ingresa las distancias con punto (.)')
                        } else {
                            // Add new point
                            const distances = [this.state.newDistance1, this.state.newDistance2, this.state.newDistance3, this.state.newDistance4, this.state.newDistance5]
                            const newKey = this.generateKey(24);
                            const newPoint = {
                                key: newKey,
                                point: this.state.newPointID,
                                type: this.state.newPointType,
                                deg: this.state.newDeg,
                                min: this.state.newMin,
                                seg: this.state.newSeg,
                                distance: distances,
                                obs: this.state.newObs
                            };
                            flatListData.push(newPoint);
                            this.props.parentFlatList.refreshFlatList(newKey);
                            this.refs.myModal.close();
                        }
                    }
                    // this.buttonPressed()
                }
                >
                    Save
                </Button>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    addmodal: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowRadius: 10,
        width: screen.width,
        height: screen.height-200,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    modaltitle: {
        color: 'black',
        // backgroundColor: '#ccc',
        textAlign: 'left',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
    },
    modalsubtitles: {
        flex: 2,
        color: 'grey',
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    subcontainer: {
        flexDirection: 'row',
        // justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 2,
    },
    modalinput: {
        flex: 2,
        height: 40,
        borderBottomColor: 'grey',
    },
    modalangleinput: {
        height: 40,
        // flex: 1,
        width: 50,
    },
    modaldistanceinput: {
        width: 60,
        // flex: 1,
    },
    modalobsinput: {
        flex: 4,
    },
    modalbutton: {
        color: 'white',
    }
})