import { View, Text, Dimensions ,StyleSheet} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";



export default function GoogleMapView({latitude,longitude}) {
   return (
        <View style={styles.container}>
         <MapView 
         provider={PROVIDER_GOOGLE}
         style={styles.map}
    region={{
      latitude: latitude || 32.18678195682675, // Default latitude if not provided
      longitude: longitude || 74.19471674587793, // Default longitude if not provided
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
  }}
>
<Marker
      coordinate={{ latitude: latitude, longitude: longitude }}
      title={'Property Location'}
      description={`This is Property's location`}
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
 