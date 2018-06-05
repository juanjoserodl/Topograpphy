// 
// BasicFlatList.js
// Topograpphy
// 
// Created by Juan J. Rodríguez López on 19/04/18.
// Copyright 2018 Juan. All rights reserved.
// 

import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableOpacity, AsyncStorage } from 'react-native';
import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';

import AddModal from './AddModal';
import EditModal from './EditModal';

class FlatListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null,
            promedio: this.distancesArraySum()/this.props.item.distance.length
            // list: ''
        };
        // try{
        //     AsyncStorage.getItem('database_points').then((value) => {
        //         this.setState({
        //             list: JSON.parse(value)
        //         })
        //     })
        // } catch(err){
        //     console.log(err)
        // }
    }
    // parseData(){
    //     if(this.state.list){
    //         return this.state.list.map((data, i) => {
    //             return (
    //                 <View 
    //                     style={{marginVertical: 5}}
    //                     key = {i}>
    //                     <Text> {data.point} </Text>
    //                     <Text> {data.type} </Text>
    //                     <Text> {data.deg} </Text>
    //                     <Text> {data.min} </Text>
    //                     <Text> {data.seg} </Text>
    //                     <Text> {data.distance} </Text>
    //                     <Text> {data.obs} </Text>
    //                 </View>
    //             )
    //         })
    //     }
    // }

    refreshFlatListItem = () => {
        this.setState((prevState) => {
            return {
                numberOfRefresh: prevState.numberOfRefresh + 1
            };
        });        
    }

    sayHi(){
        return 'Hi!!'
    }
    
    distancesArraySum(){
        var suma = 0
        for(var i = 0; i < this.props.item.distance.length; i++){
            suma += + parseFloat(this.props.item.distance[i])
        }
        return suma
    }
    

    distanceError(){
        var sumaerror = 0
        for(var i = 0; i < this.props.item.distance.length; i++){
            sumaerror += Math.pow(((this.distancesArraySum()/this.props.item.distance.length) - parseFloat(this.props.item.distance[i])), 2)
        }
        return sumaerror
    }

    sexagesimalToDecimalAngle(){
        var angle = 0
        return angle = parseFloat(this.props.item.deg) + (parseFloat(this.props.item.min)/60) + (parseFloat(this.props.item.seg)/3600)
    }

    

    render() {   
        const data = JSON.stringify(this.state.list)

        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }              
            },          
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key });
            },      
            right: [
                { 
                    onPress: () => {    
                        const deletingRow = this.state.activeRowKey;          
                        Alert.alert(
                            'Advertencia',
                            '¿Estas seguro que quieres borrar este punto?, si lo borras no se recuperara la información.',
                            [                              
                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                            {text: 'Si', onPress: () => {        
                                flatListData.splice(this.props.index, 1); 
                                //Refresh FlatList ! 
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                            }},
                            ],
                            { cancelable: true }
                        ); 
                    }, 
                    text: 'Delete', type: 'delete' 
                },                
                { 
                    onPress: () => {                            
                        // alert("Update");
                        this.props.parentFlatList.refs.editModal.showEditModal(flatListData[this.props.index], this);
                    }, 
                    text: 'Edit', backgroundColor: 'purple'
                },
                {
                    onPress: () => {
                        // var promedio = this.distancesArraySum()/this.props.item.distance.length
                        Alert.alert(
                            'Informacion del punto ' + this.props.item.point,
                            'Promedio: ' + (this.distancesArraySum()/this.props.item.distance.length).toFixed(3) + '\n' + 
                            'Error Probable: \xB1' + (0.6745 * Math.sqrt(this.distanceError() / (this.props.item.distance.length - 1 ))).toFixed(4) + '\n' +
                            'Error Probable de la Media: \xB1' + (0.6745 * Math.sqrt(this.distanceError() / (this.props.item.distance.length * (this.props.item.distance.length - 1)))).toFixed(4) + '\n' +
                            'Precisión: ' + Math.round((this.distancesArraySum()/this.props.item.distance.length)/(0.6745 * Math.sqrt(this.distanceError() / (this.props.item.distance.length * (this.props.item.distance.length - 1))))) + '\n' + '\n' +
                            'Proyección Norte-Sur: ' + (Math.cos(this.sexagesimalToDecimalAngle()*(Math.PI/180)) * (this.distancesArraySum()/this.props.item.distance.length)).toFixed(3) + '\n' +
                            'Proyección Este-Oeste: ' + (Math.sin(this.sexagesimalToDecimalAngle()*(Math.PI/180)) * (this.distancesArraySum()/this.props.item.distance.length)).toFixed(3) + '\n' + '\n' +

                            'Coordenada Norte: ' + (1000 + (Math.cos(this.sexagesimalToDecimalAngle()*(Math.PI/180)) * (this.distancesArraySum()/this.props.item.distance.length))).toFixed(3) + '\n' +
                            'Coordenada Este: ' + (1000 + (Math.sin(this.sexagesimalToDecimalAngle()*(Math.PI/180)) * (this.distancesArraySum()/this.props.item.distance.length))).toFixed(3)
                            // Math.cos(90*(Math.PI /180)).toFixed(6)
                            // this.sayHi(),
                        )
                    },
                    text: 'Info', type:'primary'
                }
            ],  
            rowId: this.props.index, 
            sectionId: 1    
        };  
        return (
            <Swipeout {...swipeSettings}>
                <View style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    alignContent: 'stretch',
                    flexDirection: 'column',
                    backgroundColor: '#EEEEEE',
                }}>
                    

                    {/* Datos */}
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderRadius: 3,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        marginHorizontal: 10,
                        height: 33,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        marginVertical: 4,
                        backgroundColor: 'white', /*this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'*/
                        // backgroundColor: 'mediumseagreen'
                        // shadowOffset: { width: 30, height: 30 },
                        // shadowOpacity: 1,
                        // shadowRadius: 10 ,
                        elevation: 2

                    }}>
                        {/* {this.parseData()} */}
                        {/* <Text style={[styles.flatListItem, styles.numPointItem]}>
                            {data}
                        </Text>                     */}
                        <Text style={[styles.flatListItem, styles.numPointItem]}>
                            {this.props.item.point}
                        </Text>
                        <Text style={[styles.flatListItem, styles.textItem]}>
                            {this.props.item.type}
                        </Text>
                        

                        <Text style={[styles.flatListItem, styles.numItem]}>
                            {this.props.item.deg + '\xB0' + this.props.item.min + '\'' + this.props.item.seg + '\'\'' }
                        </Text>
                        
                        {/* <Text style={[styles.flatListItem, styles.numItem]}>
                            {this.props.item.distance}
                        </Text> */}
                        <View  style={{
                                flex:4,
                                paddingLeft: 5,
                                paddingVertical: 3,
                                alignSelf: 'center',
                                flexDirection: 'row',
                                flexWrap: 'wrap'
                        }}>
                                { this.props.item.distance.map((item, key) => (
                                <View style={{width:30}}> 
                                    <Text 
                                    key={key} 
                                    style={[ styles.numDistanceItem]}
                                    > 
                                        { item } 
                                    </Text>
                                </View>
                                ))}
                        </View>
                    
                        <Text style={[styles.flatListItem, styles.textlongItem]}>
                            {this.props.item.obs}
                        </Text>
                    </View>
                </View>
                    </Swipeout>
        );
    }
}

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }

    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });
        this.refs.flatList.scrollToEnd();
    }

    _onPressAdd() {
        // alert("You add Item");
        this.refs.addModal.showAddModal();
    }
    
    render() {
        return (
            <View style={{ flex: 1, alignSelf: 'stretch', marginTop: Platform.OS === 'ios' ? 34 : 0 }}>
                <View style={{
                    backgroundColor: '#1565C0',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    marginBottom: 5,
                }}>
                    <Text style={styles.title}> 
                        Topograpphy 
                    </Text>
                    <TouchableOpacity
                        style={styles.addPointButton}
                        onPress={this._onPressAdd}  
                    >
                        <Text style={{color: 'white'}}> Add Point </Text>
                    </TouchableOpacity>
                </View>
                {/* Encabezado */}
                <View style={{
                        // flex: 1,
                        flexDirection: 'row',
                        // borderRadius: 2,
                        paddingHorizontal: 8,
                        height: 20,
                        paddingVertical: 2,
                        marginHorizontal: 10,
                        marginVertical: 5,
                        // backgroundColor: 'white', /*this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'*/
                        // // backgroundColor: 'mediumseagreen'
                        // // shadowOffset: { width: 30, height: 30 },
                        // // shadowOpacity: 1,
                        // // shadowRadius: 10 ,
                        // elevation: 2

                    }}>

                        <Text style={[styles.flatListItemHeader, styles.numPointItem]}>
                            No.
                        </Text>
                        <Text style={[styles.flatListItemHeader, styles.textItem]}>
                            Tipo
                        </Text>
                        <Text style={[styles.flatListItemHeader, styles.numItem]}>
                            Azimut
                        </Text>
                        <Text style={[styles.flatListItemHeader, styles.numLongItem ]}>
                            Distancias
                        </Text>
                        <Text style={[styles.flatListItemHeader, styles.textlongItem]}>
                            Observaciones
                        </Text>
                </View>
                <FlatList
                    ref={"flatList"}
                    data={flatListData}
                    renderItem={({ item, index }) => {
                        //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                        return (
                            <FlatListItem item={item} index={index} parentFlatList={this}>

                            </FlatListItem>
                        );
                    }}
                >

                </FlatList>

                <AddModal ref={'addModal'} parentFlatList={this} >

                </AddModal>
                <EditModal ref={'editModal'} parentFlatList={this} >

                </EditModal>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    title: {
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    addPointButton: {
        marginRight: 10,
        backgroundColor: '#0D47A1',
        borderRadius: 4,
        height: 35,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    },
    flatListItemHeader: {
        fontSize:14
    },
    flatListItem: {
        flex: 2,
        color: '#212121',
        paddingVertical: 3,
        fontSize: 11,
        // justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'center',
        // textAlign: 'center'
    },
    numDistanceItem: {
        textAlign: 'right',
        fontSize: 8,
        color: '#212121'
    },
    numLongItem: {
        flex: 5,
        textAlign: 'center'
    },
    textItem: {
        flex: 2,
        textAlign: 'center'
    },
    textlongItem: {
        marginLeft: 10,
        flex: 4,
        textAlign: 'left'
    },
    numPointItem: {
        flex: 1,
        textAlign: 'center'
    },
    numItem: {
        flex: 2,
        textAlign: 'right',
    }
})