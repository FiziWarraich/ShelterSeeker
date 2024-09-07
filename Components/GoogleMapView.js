import { View, Text, Dimensions ,StyleSheet} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";



export default function GoogleMapView() {
   return (
        <View style={styles.container}>
         <MapView 
         provider={PROVIDER_GOOGLE}
         style={styles.map}
    region={{
    latitude:32.18678195682675,  
    longitude:74.19471674587793,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  }}
>
<Marker
      coordinate={{latitude: 32.16217446156376, longitude: 74.20441831286597}}
      title={'I am here'}
      description={'This is my current location'}
    />
    </MapView>
        </View>
    )
};

const styles=StyleSheet.create
({
container:
{
   ...StyleSheet.absoluteFillObject,
    justifyContent:'center',
    alignItems:'center',
    height:400,
    width:400,

},
map:
{
    ...StyleSheet.absoluteFillObject,
},
});
 