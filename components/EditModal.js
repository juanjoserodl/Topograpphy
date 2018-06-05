// 
// EditModal.js
// Topograpphy
// 
// Created by Juan J. Rodríguez López on 19/04/18.
// Copyright 2018 Juan. All rights reserved.
// 

import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, 
    View, Alert, Platform, Dimensions, 
    TextInput, BackHandler} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
let dropDownData = [{ value: 'Lindero' }, { value: 'Detalle' }]

export default class EditModal extends Component {
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
            PointID: '',
            PointType: '',
            Deg: '',
            Min: '',
            Seg: '',
            Distance1: '',
            Distance2: '',
            Distance3: '',
            Distance4: '',
            Distance5: '',
            Obs: ''
        }
    }
    
    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return {
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });        
    }

    showEditModal = (editingPoint, flatlistItem) => {
        console.log(`editingPoint = ${JSON.stringify(editingPoint)}`)
        this.setState({
            key: editingPoint.key,
            PointID: editingPoint.point,
            PointType: editingPoint.type,
            Deg: editingPoint.deg,
            Min: editingPoint.min,
            Seg: editingPoint.seg,
            Distance1: editingPoint.distance[0],
            Distance2: editingPoint.distance[1],
            Distance3: editingPoint.distance[2],
            Distance4: editingPoint.distance[3],
            Distance5: editingPoint.distance[4],
            Obs: editingPoint.obs,
            flatlistItem: flatlistItem
        })
        this.refs.myModal.open()
    }

    generateKey = (numberOfCharacters) => {
        return require('random-string')({ length: numberOfCharacters });
    }
    
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={styles.editmodal}
                position='bottom'
                backdrop={true}
                onClosed={() => {
                    // alert("Modal closed");
                }}
            >
                <Text style={styles.modaltitle}> Editar Punto </Text>

                <View style={styles.subcontainer}>
                    <Text style={styles.modalsubtitles}> Info. Punto </Text>
                    <View style={{flex:4, flexDirection: 'row'}}>
                        <TextInput
                            style={styles.modalinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ PointID: text })}
                            placeholder='No. Punto'
                            value={this.state.PointID}
                            />

                        <View style={{ flex: 2, marginTop: -25, marginBottom: 3, marginLeft: 10 }}>
                            <Dropdown
                                label='Tipo de Punto'
                                data={dropDownData}
                                onChangeText={(text) => this.setState({ PointType: text })}
                                value={this.state.PointType}
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
                            onChangeText={(text) => this.setState({ Deg: text })}
                            placeholder='Deg'
                            value={this.state.Deg}
                            />

                        <TextInput
                            style={styles.modalangleinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ Min: text })}
                            placeholder='Min'
                            value={this.state.Min}
                            />

                        <TextInput
                            style={styles.modalangleinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ Seg: text })}
                            placeholder='Seg'
                            value={this.state.Seg}
                        />
                    </View>    
                </View >

                <View style={styles.subcontainer}>
                    <Text style={styles.modalsubtitles}> Distancia </Text>
                    <View style={{flex:4, flexDirection: 'row', flexWrap: 'wrap'}}>
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ Distance1: text })}
                            placeholder='ej. 22.123'
                            value={this.state.Distance1}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ Distance2: text })}
                            placeholder='ej. 22.123'
                            value={this.state.Distance2}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ Distance3: text })}
                            placeholder='ej. 22.123'
                            value={this.state.Distance3}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ Distance4: text })}
                            placeholder='ej. 22.123'
                            value={this.state.Distance4}
                        />  
                        <TextInput
                            style={styles.modaldistanceinput}
                            keyboardType='numeric'
                            onChangeText={(text) => this.setState({ Distance5: text })}
                            placeholder='ej. 22.123'
                            value={this.state.Distance5}
                        />  
                    </View>
                </View >

                <View style={styles.subcontainer}>
                    <Text style={styles.modalsubtitles}> Observaciones </Text>
                    <TextInput
                        autoCorrect={false}
                        style={styles.modalobsinput}
                        onChangeText={(text) => this.setState({ Obs: text })}
                        placeholder='Max. 40 char.'
                        keyboardType="default"
                        value={this.state.Obs}
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
                        backgroundColor: 'purple'
                    }}
                    onPress={() => {
                        // Point's data validation
                        if(this.state.PointID == '' || this.state.Deg == '' || this.state.Min == '' || this.state.Seg == '' || this.state.Distance1 == '' || this.state.Distance2 == '' || this.state.Distance3 == '' || this.state.Distance4 == '' || this.state.Distance5 == '' ){
                            alert('Existen campos que estan vacios. Ingresa los datos restantes')
                        } else if(this.state.Deg < 0 || this.state.Min < 0 || this.state.Seg < 0){
                            alert('Alguno de los datos es menor al rango permitido')
                        } else if(this.state.Deg >= 360 || this.state.Min >= 60 || this.state.Seg >= 60){
                            alert('Alguno de los datos es mayor o igual al rango permitido')    
                        } else if(this.state.Distance1.includes(',') || this.state.Distance2.includes(',') ||                                     this.state.Distance3.includes(',') || this.state.Distance4.includes(',') ||                                     this.state.Distance5.includes(',')){
                            alert('El formato de ingreso de distancias es erroneo. Ingresa las distancias con punto (.)')
                        } else {
                        
                            // Update existing point
                            var foundIndex = flatListData.findIndex(item => this.state.key == item.key)
                            if (foundIndex < 0) {
                                return; //not found
                            }
                            flatListData[foundIndex].point = this.state.PointID
                            flatListData[foundIndex].type = this.state.PointType
                            flatListData[foundIndex].deg = this.state.Deg
                            flatListData[foundIndex].min = this.state.Min
                            flatListData[foundIndex].seg = this.state.Seg
                            flatListData[foundIndex].distance[0] = this.state.Distance1
                            flatListData[foundIndex].distance[1] = this.state.Distance2
                            flatListData[foundIndex].distance[2] = this.state.Distance3
                            flatListData[foundIndex].distance[3] = this.state.Distance4
                            flatListData[foundIndex].distance[4] = this.state.Distance5
                            flatListData[foundIndex].obs = this.state.Obs
                            // Refresh flatlist item
                            this.state.flatlistItem.refreshFlatListItem();
                            this.refs.myModal.close()
                        }
                    }}
                >
                    Update
                </Button>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    editmodal: {
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