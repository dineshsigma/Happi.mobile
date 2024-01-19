import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform, LayoutAnimation
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { BottomSheet } from "react-native-btr";
import moment from 'moment/moment';
import { AccordionList } from 'accordion-collapse-react-native';
import { getProductPrice } from "../reducers/products";
import Spinner from 'react-native-loading-spinner-overlay';
import { List, Title } from 'react-native-paper';


const ProductsDetails = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [cameraOn, setCameraOn] = React.useState()
  const item_info = route.params
  const productsPrice = useSelector((state) => state.products.productPrice);
  const [visible, setVisible] = React.useState(false);
  const [offerDetails, setOfferDetails] = React.useState()
  const [offerInfo, setOfferInfo] = React.useState()
  const [offerBody, setOfferBody] = React.useState();
  const loading = useSelector((state) => state.products.isLoading);

  const regex = /(<([^>]+)>)/ig;
  function toggle() {
    setVisible((visible) => !visible);
  }
  React.useEffect(() => {
    let payload = {
      "type": "search",
      "ITEM_CODE": item_info.ITEM_CODE
    }
    dispatch(getProductPrice(payload)).then((res) => {
      setOfferInfo(res.payload?.offers?.data)
      setOfferBody(res.payload?.offerDetails)
    })
  }, [])



  const openBottomSheet = (offer, g) => {
    setOfferDetails(offer)
    setVisible((visible) => !visible);
  }

  const sections = [
    {
      title: 'Brand Offers',
      content: <Text style={styles.textSmall}>
        Show Bank Offers Here
      </Text>,
      offerDets: <Text>{offerInfo && offerInfo[0]?.totalBrandOffers}</Text>,
      offerBody: offerBody?.BrandArray?.map((item, id) => {
        return <List.Subheader style={{ fontSize: 14, textTransform: 'capitalize' }}>{id + 1} - {item.discount_Rule}{'\n'}</List.Subheader>
      })
    },
    {
      title: 'Card Offers',
      content: <Text style={styles.textSmall}>
        Show Brand Offers Here
      </Text>,
      offerDets: <Text>{offerInfo && offerInfo[0]?.totalCardOffers}</Text>,
      offerBody: offerBody?.cardArray?.map((item, id) => {
        return <List.Subheader style={{ fontSize: 14, textTransform: 'capitalize' }}>{id + 1} - {item.card_rule}{'\n'}</List.Subheader>
      })
    },
    {
      title: 'Happi Offers',
      content: <Text style={styles.textSmall}>
        Show Happi Offers Here
      </Text>,
      offerDets: <Text>{offerInfo && offerInfo[0]?.totalHappiOffers}</Text>,
      offerBody: offerBody?.happiArray?.map((item, id) => {
        return (
          <List.Subheader style={{ fontSize: 14, textTransform: 'capitalize', padding: 15 }}>{id + 1} - {item?.happi_rule}{'\n'}</List.Subheader>
        )
      })
    },
    {
      title: 'BAJAJ',
      content: <Text style={styles.textSmall}>
        Show BAJAJ Offers Here
      </Text>,
      offerDets: <Text>{offerInfo && offerInfo[0]?.totalFinanaceOffers}</Text>,
      offerBody: offerBody?.finanaceArray?.map((item, id) => {
        return <List.Subheader style={{ fontSize: 14, textTransform: 'capitalize', padding: 5 }}>{id + 1} - {item.finance_rule}{'\n'}</List.Subheader>
      })
    },
  ];
  function renderHeader(section, _, isActive) {
    return (
      <View style={styles.accordHeader}>
        <Text style={[isActive ? styles.accordTitle : styles.inactiveTitle]}>{section.title}</Text>
        <View style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgb(251, 144, 19)' }}>
          <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '600' }}>{section.offerDets}</Text>
        </View>
        <MaterialCommunityIcons name={isActive ? 'chevron-up' : 'chevron-down'}
          size={20} color="#bbb" />
      </View>
    );
  };

  function renderContent(section, _, isActive) {
    return (
      <ScrollView style={[styles.accordBody, { flexDirection: 'column' }]}>
        <Text>{section.offerBody}</Text>
      </ScrollView>
    );
  }

  function handleOnToggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }


  console.log(offerInfo, "offerInfoofferInfo")
  return (
    <View>
      <View style={{ padding: 15 }}>
        <Spinner
          visible={loading}
          //Text with the Spinner
          textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={[styles.spinnerTextStyle, { color: '#fff' }]}
        />
        {/* <MaterialCommunityIcons name="keyboard-backspace" color="#6F787C" size={26} style={{ top: 20 }} onPress={() => navigation.goBack()} /> */}
        <View style={styles.button}
        >
          <View>
            <Text style={{ top: 5, fontWeight: '700', fontSize: 18, textAlign: 'center', color: '#000' }}>{item_info?.ITEM_NAME}</Text>
            <Text style={{ top: 5, fontWeight: '700', textAlign: 'center', color: '#000' }}>HAPPI PRICE</Text>
            {productsPrice?.price?.data && <Text style={{ top: 5, fontWeight: '700', color: 'rgb(251, 144, 19)', textAlign: 'center', fontSize: 24 }}>₹{parseInt(productsPrice?.price?.data[0]?.ITEM_PRICE).toLocaleString('en-IN')}.00/-</Text>}


          </View>
        </View>
        {/* <Text>Product details</Text> */}

      </View>
      <ScrollView style={{ marginTop: 20 }}>
        {/* <Text style={{ marginTop: 20, left: 20, fontSize: 18, color: '#000' }}>Offers</Text> */}
        {productsPrice?.offers?.status &&
          // <AccordionList
          //         list={sections}
          //         header={renderHeader}
          //         body={renderContent}
          //         onToggle={handleOnToggle}
          //       />
          <List.Section title="OFFERS">
            <List.Accordion
              title="Brand Offers"
              // titleStyle={{ color: '#000' }}
              left={props => <List.Icon {...props} icon="star" color="rgb(251, 144, 19)" />}
              right={props =>
                <View style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgb(251, 144, 19)' }}>
                  <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '600' }}>{offerInfo && offerInfo[0]?.totalBrandOffers}</Text>
                </View>}
            >
              {offerBody?.BrandArray?.map((item, id) => {
                return <List.Item title={item?.brand_title} titleStyle = {{color:'#000'}} description={item?.discount_Rule} descriptionStyle={{ textTransform: 'capitalize',color:'#000' }} />

              })}
            </List.Accordion>

            <List.Accordion
              title="Card Offers"
              // titleStyle={{ color: '#000' }}
              left={props => <List.Icon {...props} icon="star" color="rgb(251, 144, 19)" />}
              right={props =>
                <View style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgb(251, 144, 19)' }}>
                  <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '600' }}>{offerInfo && offerInfo[0]?.totalCardOffers}</Text>
                </View>
              }
            >
              {offerBody?.cardArray?.map((item, id) => {
                return <List.Item title={item.card_title} titleStyle = {{color:'#000'}} description={item?.card_rule} descriptionStyle={{ textTransform: 'capitalize',color:'#000' }} />

              })}
            </List.Accordion>

            <List.Accordion
              title="Happi Offers"
              // titleStyle={{ color: '#000' }}
              left={props => <List.Icon {...props} icon="star" color="rgb(251, 144, 19)" />}
              right={props => <View style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgb(251, 144, 19)' }}>
                <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '600' }}>{offerInfo && offerInfo[0]?.totalHappiOffers}</Text>
              </View>}
            >
              {offerBody?.happiArray?.map((item, id) => {
                return <List.Item title={item?.happi_title} titleStyle = {{color:'#000'}} description={item?.happi_rule} descriptionStyle={{ textTransform: 'capitalize',color:'#000' }} />

              })}
            </List.Accordion>

            <List.Accordion
              title="Finance Offers"
              // titleStyle={{ color: '#000' }}
              left={props => <List.Icon {...props} icon="star" color="rgb(251, 144, 19)" />}
              right={props => <View style={{ marginLeft: 'auto', width: 20, height: 20, borderRadius: 10, backgroundColor: 'rgb(251, 144, 19)' }}>
                <Text style={{ alignSelf: 'center', color: '#fff', fontWeight: '600' }}>{offerInfo && offerInfo[0]?.totalFinanceOffers}</Text>
              </View>}
            >
              {offerBody?.finanaceArray?.map((item, id) => {
                return <List.Item title={item?.finance_title} titleStyle = {{color:'#000'}} description={item?.finance_rule} descriptionStyle={{ textTransform: 'capitalize',color:'#000' }} />

              })}
            </List.Accordion>

          </List.Section>

        }
        <View style={{ height: 500 }}></View>
      </ScrollView>
      {!productsPrice?.offers?.status &&
        <View style={{ justifyContent: 'center', left: 20, top: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: '600' }}>No Offers Found</Text>
        </View>
      }
      {/* {productsPrice?.offers?.map((offer) => {
                return (
                    // <TouchableOpacity onPress={ () => openBottomSheet(offer)}>
                    // <View style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 10 }}>
                    //     <View style={[styles.button, { height: 50, marginTop: 0 }]}
                    //     >
                    //         <View >
                    //             <Text style={{ fontWeight: '700', fontSize: 18, textAlign: 'center', color:'#000', textTransform:'capitalize' }}>{offer?.title}</Text>
                    //         </View>
                    //     </View>
                    // </View>
                    // </TouchableOpacity>
                    <AccordionList
                    list={sections}
                    header={renderHeader}
                    body={renderContent}
                    onToggle={handleOnToggle}
                  />
                )
            })} */}

      <View style={styles.container}>
        {/* <TouchableOpacity onPress={toggle}> */}
        {/* <View style={styles.butto}>
          <Text>Toggle BottomSheet</Text>
        </View> */}
        {/* </TouchableOpacity> */}
        <BottomSheet
          visible={visible}
          onBackButtonPress={toggle}
          onBackdropPress={toggle}
        >
          <View style={styles.card}>
            <Text style={{ color: '#000', textTransform: 'capitalize' }}>{offerDetails?.description}</Text>
            <Text style={{ color: '#000', textTransform: 'capitalize' }}>{offerDetails?.terms.replace(regex, '')}</Text>
            <Text style={{ color: '#000', textTransform: 'capitalize' }}>Offers Ends on - {moment(offerDetails?.endDatetime).format('llll')}</Text>
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.4,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  button: { top: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', height: 60, borderWidth: 1, borderRadius: 10, marginTop: 30, borderColor: 'orange', height: 150 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  butto: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 50,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    color: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 6,
    borderRadius: 6
  },
  accordTitle: {
    fontSize: 16,
    color: 'rgb(251, 144, 19)',
    fontWeight: '500'
  },
  inactiveTitle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },
  accordBody: {
    padding: 12,
    backgroundColor: '#fff',
    top: -5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  textSmall: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.75)'
  },
  seperator: {
    height: 12
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    bottom: 5

  }


});

export default ProductsDetails;
