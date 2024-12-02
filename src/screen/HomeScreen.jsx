import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  NativeModules,
  Dimensions,
  NativeEventEmitter
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data/data.json";
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { loadCGCampaign, enableCGAnalytic, setCGScreenName } from "../customerglu/CGManger"
import {
  dataClear,
} from '@customerglu/react-native-customerglu';
const HomeScreen = () => {
  const [products, setProducts] = useState(data.products);
  const navigation = useNavigation();
  const [finalHeight, setFinalHeight] = useState(0);
  const windowHeight = Dimensions.get('window').height;

  useFocusEffect(
    React.useCallback(() => {
      setCGScreenName("Home_Medicine");
    }, [])
  );
  useEffect(() => {
    // Call registerUser when the component mounts
    // pass your userId
   // registerUser("glutest-78");

  // enableCGAnalytic()


   const { Rncustomerglu } = NativeModules;
   const RncustomergluManagerEmitter = new NativeEventEmitter(Rncustomerglu);

   const eventanalytics = RncustomergluManagerEmitter.addListener(
       'CUSTOMERGLU_ANALYTICS_EVENT',
       (reminder) => 
       console.log('CUSTOMERGLU_ANALYTICS_EVENT...', reminder)
   );

   const CG_UNI_DEEPLINK_EVENT = RncustomergluManagerEmitter.addListener(
       'CG_UNI_DEEPLINK_EVENT',
       (reminder) => 
       console.log('CG_UNI_DEEPLINK_EVENT...', reminder)
   );

   const eventdeeplink = RncustomergluManagerEmitter.addListener(
       'CUSTOMERGLU_DEEPLINK_EVENT',
       (reminder) => 
       {
           if (Platform.OS === 'ios') {
               reminder = reminder.data
           }
            console.log('CUSTOMERGLU_DEEPLINK_EVENT...Handle your Redirection logic',  reminder)
            navigation.navigate("Profile")
          //  if(reminder && reminder.campaignId){
          //  loadCampaignById(reminder.campaignId,)
          //  }
       }
       
   );
   const eventbanner = RncustomergluManagerEmitter.addListener(
       'CUSTOMERGLU_BANNER_LOADED',
       (reminder) => 
       console.log('CUSTOMERGLU_BANNER_LOADED...>>>>>', reminder)
   );

   const invalidCampid = RncustomergluManagerEmitter.addListener(
       'CG_INVALID_CAMPAIGN_ID',
       (reminder) => 
       console.log('CG_INVALID_CAMPAIGN_ID...>>>>>', reminder)
   );
   let eventfheight = null,EmbedBannerHeight=null
   if (Platform.OS === 'ios') {
       eventfheight = RncustomergluManagerEmitter.addListener(
           'CGBANNER_FINAL_HEIGHT',
           (reminder) => {
               console.log('reminder----', reminder);
               // console.log('reminder["entry1"]....', reminder["entry1"])
               if (reminder && reminder["homescreen_banner"]) {
                setFinalHeight(reminder["homescreen_banner"] * windowHeight / 100);

               }

           }

       );
       EmbedBannerHeight = RncustomergluManagerEmitter.addListener(
           'CGEMBED_FINAL_HEIGHT',
           (reminder) => {
               console.log('reminder----', reminder);
               // console.log('reminder["embedded1"]....', reminder["embedded1"])
               if (reminder && reminder["embedded1"]) {
               }

           }

       );
      }


   return () => {
    eventanalytics.remove();
    eventdeeplink.remove();
    eventbanner.remove();
    invalidCampid.remove()
    CG_UNI_DEEPLINK_EVENT.remove()
    if (Platform.OS === 'ios') {
        console.log('destroy.!!!!!!!!')
        

    }

}
    


  }, []);
  const handleProductDetails = (item) => {
    dataClear();
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          console.log("prod: ", prod);
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };


  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      {/* header */}
      <Header />

      <FlatList
        ListHeaderComponent={
          <>
            <View>
              <Text style={styles.headingText}>Match Your Style</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require("../assets/search.png")}
                  style={styles.searchIcon}
                />
                <TextInput placeholder="Search" style={styles.textInput} />
              </View>
              
              {/* Full-width image */}
              <TouchableOpacity
              accessibilityLabel="cgbanner"
              onPress={() => {
               loadCGCampaign("148784bc-bb85-4701-8953-ee8b3a6a422a")
              }}>
              <Image
              headingText="banner"
                source={{ uri: "https://assets.customerglu.com/demo/nudges/banner-2.png" }} // Replace with your image URL
                style={styles.bannerImage}
                
              />
              </TouchableOpacity>
              {/* <BannerWidget
                        style={{flex:1, width: '90%', height: Platform.OS === 'ios' ? finalHeight : null }}
                        bannerId="homescreen_/banner"
                    /> */}
            </View>
            <Tags />
          </>
        }
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <View>
        {/* <Text>HomeScreen</Text>
        <Text>HomeScreen</Text> */}
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Ensures the image covers the full width and maintains its aspect ratio
    marginVertical: 20,
  },
});
