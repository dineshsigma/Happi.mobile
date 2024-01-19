import * as React from 'react';
import { DataTable } from 'react-native-paper';
import {
    Text, StyleSheet, View, Image, Pressable,Button, ScrollView,TextInput, TouchableOpacity,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SelectList } from 'react-native-dropdown-select-list'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const History = props => {
  const navigation = useNavigation();
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([5, 20, 40]);
  const [isClicked, setIsClicked] = React.useState(false);
  const [currentKey, setCurrentKey] = React.useState();

  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );
  const [state, setState] = React.useState({
    // tableHead: ['Date', 'Discount Category','Reference No','Customer Mobile','Model','Amount','Discount Status','Coupon Status','Actions'],
        tableHead:[{
            title:'Date',
            width:80,

        },
        {
            title:'Discount Category',
            width:120,
        },
        {
            title:'Reference No',
            width:120,
        },
        {
            title:'Customer Mobile',
            width:120,
        },
        {
            title:'Model',
            width:150,
        },
        {
            title:'Amount',
            width:80,
        },
        {
            title:'Discount Status',
            width:100,
        },
        {
            title:'Coupon Status',
            width:100,
        },
        {
            title:'Actions',
            width:100,
        },

        ]
});
  const [items] = React.useState([
   {
     key: 1,
     Date:'JUL',
     Discount_Category:'cash',
     Reference_No: 'HAPMD00002',
     Mobile:'9659430301',
     Model: 'IPHONE 11 64GB YELLOW	',
     Amount: '2500',
     Discount_Status:'Approved',
     Coupon_Status:'NOT-USED',
     Actions:'dropdown'
   },
   {
    key: 2,
    Date:'JUL',
    Discount_Category:'cash',
    Reference_No: 'HAPMD00003',
    Mobile:'9659434501',
    Model: 'REDMI 64GB YELLOW	',
    Amount: '2500',
    Discount_Status:'Approved',
    Coupon_Status:'NOT-USED',
    Actions:'dropdown'
   },
   {
    key: 3,
    Date:'JUL',
    Discount_Category:'card',
    Reference_No: 'HAPMD00004',
    Mobile:'9659434501',
    Model: 'REDMI 64GB RED	',
    Amount: '2500',
    Discount_Status:'Rejected',
    Coupon_Status:'NOT-USED',
    Actions:'dropdown'
   },
   {
    key: 4,
    Date:'JUL',
    Discount_Category:'cash',
    Reference_No: 'HAPMD00003',
    Mobile:'9659434523',
    Model: 'REDMI 64GB PINK	',
    Amount: '2500',
    Discount_Status:'Approved',
    Coupon_Status:'NOT-USED',
    Actions:'dropdown'
   },
   {
    key: 5,
    Date:'JUL',
    Discount_Category:'cash',
    Reference_No: 'HAPMD00002',
    Mobile:'9659430301',
    Model: 'IPHONE 11 64GB YELLOW	',
    Amount: '2500',
    Discount_Status:'Approved',
    Coupon_Status:'NOT-USED',
    Actions:'dropdown'
  },
  {
   key: 6,
   Date:'JUL',
   Discount_Category:'cash',
   Reference_No: 'HAPMD00003',
   Mobile:'9659434501',
   Model: 'REDMI 64GB YELLOW	',
   Amount: '2500',
   Discount_Status:'Approved',
   Coupon_Status:'NOT-USED',
   Actions:'dropdown'
  },
  {
   key: 4,
   Date:'JUL',
   Discount_Category:'card',
   Reference_No: 'HAPMD00004',
   Mobile:'9659434501',
   Model: 'REDMI 64GB RED	',
   Amount: '2500',
   Discount_Status:'Rejected',
   Coupon_Status:'NOT-USED',
   Actions:'dropdown'
  },
  {
   key: 8,
   Date:'JUL',
   Discount_Category:'cash',
   Reference_No: 'HAPMD00003',
   Mobile:'9659434523',
   Model: 'REDMI 64GB PINK	',
   Amount: '2500',
   Discount_Status:'Approved',
   Coupon_Status:'NOT-USED',
   Actions:'dropdown'
  },
  {
    key: 9,
    Date:'JUL',
    Discount_Category:'cash',
    Reference_No: 'HAPMD00002',
    Mobile:'9659430301',
    Model: 'IPHONE 11 64GB YELLOW	',
    Amount: '2500',
    Discount_Status:'Approved',
    Coupon_Status:'NOT-USED',
    Actions:'dropdown'
  },
  {
   key: 10,
   Date:'JUL',
   Discount_Category:'cash',
   Reference_No: 'HAPMD00003',
   Mobile:'9659434501',
   Model: 'REDMI 64GB YELLOW	',
   Amount: '2500',
   Discount_Status:'Approved',
   Coupon_Status:'NOT-USED',
   Actions:'dropdown'
  },
  {
   key: 11,
   Date:'JUL',
   Discount_Category:'card',
   Reference_No: 'HAPMD00004',
   Mobile:'9659434501',
   Model: 'REDMI 64GB RED	',
   Amount: '2500',
   Discount_Status:'Rejected',
   Coupon_Status:'NOT-USED',
   Actions:'dropdown'
  },
  {
   key: 12,
   Date:'JUL',
   Discount_Category:'cash',
   Reference_No: 'HAPMD00003',
   Mobile:'9659434523',
   Model: 'REDMI 64GB PINK	',
   Amount: '2500',
   Discount_Status:'Approved',
   Coupon_Status:'NOT-USED',
   Actions:'dropdown'
  },
  {
   key: 13,
   Date:'JUL',
   Discount_Category:'cash',
   Reference_No: 'HAPMD00002',
   Mobile:'9659430301',
   Model: 'IPHONE 11 64GB YELLOW	',
   Amount: '2500',
   Discount_Status:'Approved',
   Coupon_Status:'NOT-USED',
   Actions:'dropdown'
 },
 {
  key: 14,
  Date:'JUL',
  Discount_Category:'cash',
  Reference_No: 'HAPMD00003',
  Mobile:'9659434501',
  Model: 'REDMI 64GB YELLOW	',
  Amount: '2500',
  Discount_Status:'Approved',
  Coupon_Status:'NOT-USED',
  Actions:'dropdown'
 },
 {
  key: 15,
  Date:'JUL',
  Discount_Category:'card',
  Reference_No: 'HAPMD00004',
  Mobile:'9659434501',
  Model: 'REDMI 64GB RED	',
  Amount: '2500',
  Discount_Status:'Rejected',
  Coupon_Status:'NOT-USED',
  Actions:'dropdown'
 },
 {
  key: 16,
  Date:'JUL',
  Discount_Category:'cash',
  Reference_No: 'HAPMD00003',
  Mobile:'9659434523',
  Model: 'REDMI 64GB PINK	',
  Amount: '2500',
  Discount_Status:'Approved',
  Coupon_Status:'NOT-USED',
  Actions:'dropdown'
 },
  ]);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
    return (

        <ScrollView horizontal>
        <View> 
        <View style={[styles.searchSections]}> 
              <View style={styles.formSection}>
                <MaterialIcons style={styles.formIcon} name="search"/> 
                <TextInput style={styles.formInput} underlineColorAndroid="transparent" placeholder="Search here" variant="standard" onChangeText={text => console.log('hh', text)} />
              </View> 
            </View>
        {/* <DataTable
            data={items} // list of objects
            colNames={['Date', 'Discount_Category', 'Reference_No','Mobile','Model','Amount','Discount_status','Coupon_Status','Actions']} //List of Strings
            colSettings={[
              { name: 'Date', type: COL_TYPES.DATE, width: '8%' }, 
              { name: 'Discount_Category', type: COL_TYPES.INT, width: '10%' }, 
              {name: 'Reference_No', type: COL_TYPES.STRING, width: '20%'},
              {name: 'Mobile', type: COL_TYPES.STRING, width: '15%'},
              {name: 'Model', type: COL_TYPES.STRING, width: '20%'},
              {name: 'Amount', type: COL_TYPES.STRING, width: '20%'},
              {name: 'Discount_status', type: COL_TYPES.STRING, width: '20%'},
              {name: 'Coupon_Status', type: COL_TYPES.STRING, width: '40%'},
              {name: 'Actions', type: COL_TYPES.STRING, width: '40%'},

            ]}//List of Objects
            noOfPages={2} //number
            backgroundColor={'rgba(23,2,4,0.2)'} //Table Background Color
            headerLabelStyle={{ color: 'grey', fontSize: 12 }} //Text Style Works
        >
             <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(items.length / itemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    // label={`${from + 1}-${to} of ${items.length}`}
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={itemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Display'}
      />
            </DataTable> */}

     <DataTable>
       <DataTable.Header >
      {
            state.tableHead.map((rowData, index) => (
              <DataTable.Title key={index} style={[{width:rowData.width,justifyContent:'center',fontWeight:'700'}]} >{rowData.title}</DataTable.Title>
            ))
          }
      </DataTable.Header>

      {items.slice(from, to).map((item) => (
        <DataTable.Row key={item.key} style={{ borderBottomWidth: 1, zIndex:-1}} >
          <DataTable.Cell style={{width:70,justifyContent:'center'}}>{item.Date}</DataTable.Cell>
          <DataTable.Cell style={{width:90,justifyContent:'center'}} >{item.Discount_Category}</DataTable.Cell>
          <DataTable.Cell style={{width:120,justifyContent:'center'}}>{item.Reference_No}</DataTable.Cell>
          <DataTable.Cell style={{width:120,justifyContent:'center'}}>{item.Mobile}</DataTable.Cell>
          <DataTable.Cell style={{width:150,justifyContent:'center'}}>{item.Model}</DataTable.Cell>
          <DataTable.Cell numeric style={{width:50,justifyContent:'center'}}>{item.Amount}</DataTable.Cell>
          <DataTable.Cell style={{width:90,justifyContent:'center'}} >{item.Discount_Status}</DataTable.Cell>
          <DataTable.Cell style={{width:90,justifyContent:'center'}}>{item.Coupon_Status}</DataTable.Cell>
          <DataTable.Cell style={{width:90,justifyContent:'center'}} >
            <View style={{width:100,}}>
            <TouchableOpacity style={styles.dropdownSelector} onPress={() => { setIsClicked(!isClicked), setCurrentKey(item.key) }}>
                    <Text placeholder='Action'>Actions</Text>
                    {isClicked && currentKey == item.key ? (
                        <Icon type='font-awesome' name='chevron-up' />
                    ) : (<Icon type='font-awesome' name='chevron-down' />)}
                </TouchableOpacity>
                {isClicked && currentKey == item.key ? (
                    <View style={{width:160, height:60, backgroundColor:'#fff', right:80, elevation:50, position:'absolute'}} onPress={()=>console.log('view clicked')}>
                      <TouchableOpacity  onPress={() => { navigation.navigate('DiscountSummary',item) }} >
                      <Text style={[styles.text,styles.text_active]}>Choose an Option</Text>
                        <Text>View</Text>
                        </TouchableOpacity>
                      </View>
                ) : null}
            </View>
          </DataTable.Cell>
        
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={'Display'}
      />
    </DataTable>
        </View>

        
        </ScrollView>
     
    );
}


// const History = ({theme}) => {
//   const [page, setPage] = React.useState(0);
//   const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
//   const [itemsPerPage, onItemsPerPageChange] = React.useState(
//     numberOfItemsPerPageList[0]
//   );
//   const [state, setState] = React.useState({
//     tableHead: ['Date', 'Discount Category','Reference No','Customer Mobile','Model','Amount','Discount Status','Coupon Status','Actions'],
// });

//   const [items] = React.useState([
//    {
//      key: 1,
//      Date:'JUL',
//      Discount_Category:'cash',
//      Reference_No: 'HAPMD00002',
//      Mobile:'9659430301',
//      Model: 'IPHONE 11 64GB YELLOW	',
//      Amount: '2500',
//      Discount_Status:'Approved',
//      Coupon_Status:'NOT-USED',
//      Actions:'dropdown'
//    },
//    {
//     key: 2,
//     Date:'JUL',
//     Discount_Category:'cash',
//     Reference_No: 'HAPMD00003',
//     Mobile:'9659434501',
//     Model: 'REDMI 64GB YELLOW	',
//     Amount: '2500',
//     Discount_Status:'Approved',
//     Coupon_Status:'NOT-USED',
//     Actions:'dropdown'
//    },
//    {
//     key: 3,
//     Date:'JUL',
//     Discount_Category:'card',
//     Reference_No: 'HAPMD00004',
//     Mobile:'9659434501',
//     Model: 'REDMI 64GB RED	',
//     Amount: '2500',
//     Discount_Status:'Rejected',
//     Coupon_Status:'NOT-USED',
//     Actions:'dropdown'
//    },
//    {
//     key: 4,
//     Date:'JUL',
//     Discount_Category:'cash',
//     Reference_No: 'HAPMD00003',
//     Mobile:'9659434523',
//     Model: 'REDMI 64GB PINK	',
//     Amount: '2500',
//     Discount_Status:'Approved',
//     Coupon_Status:'NOT-USED',
//     Actions:'dropdown'
//    },
//   ]);

//   const from = page * itemsPerPage;
//   const to = Math.min((page + 1) * itemsPerPage, items.length);

//   React.useEffect(() => {
//     setPage(0);
//   }, [itemsPerPage]);

//   return (
//     <ScrollView horizontal>
//          <View style={{margin: 20, height: 300}}> 
//     <DataTable>
//       <DataTable.Header style={styles.header} theme={theme}>
//       {
//             state.tableHead.map((rowData, index) => (
//               <DataTable.Title key={index} style={styles.tableHeading} theme={theme}>{rowData}</DataTable.Title>
//             ))
//           }
//       </DataTable.Header>

//       {items.slice(from, to).map((item) => (
//         <DataTable.Row key={item.key} style={{ borderBottomWidth: 1}} theme={theme}>
//           <DataTable.Cell style={{flex: 3}} theme={theme}>{item.Date}</DataTable.Cell>
//           <DataTable.Cell style={{flex: 3}} theme={theme}>{item.Discount_Category}</DataTable.Cell>
//           <DataTable.Cell theme={theme}>{item.Reference_No}</DataTable.Cell>
//           <DataTable.Cell >{item.Mobile}</DataTable.Cell>
//           <DataTable.Cell >{item.Model}</DataTable.Cell>
//           <DataTable.Cell numeric>{item.Amount}</DataTable.Cell>
//           <DataTable.Cell >{item.Discount_Status}</DataTable.Cell>
//           <DataTable.Cell >{item.Coupon_Status}</DataTable.Cell>
//           <DataTable.Cell >{item.Actions}</DataTable.Cell>
        
//         </DataTable.Row>
//       ))}

//       <DataTable.Pagination
//         page={page}
//         numberOfPages={Math.ceil(items.length / itemsPerPage)}
//         onPageChange={(page) => setPage(page)}
//         label={`${from + 1}-${to} of ${items.length}`}
//         numberOfItemsPerPageList={numberOfItemsPerPageList}
//         numberOfItemsPerPage={itemsPerPage}
//         onItemsPerPageChange={onItemsPerPageChange}
//         showFastPaginationControls
//         selectPageDropdownLabel={'Display'}
//       />
//     </DataTable>
//     </View>
//     </ScrollView>
//   );
// };





const styles = StyleSheet.create({
    table:{
        borderWidth:1
    },
    headSection:{
        borderBottomWidth:2,
        borderColor:'black',
        paddingBottom:15,
        
    },
    titleHeading:{
        marginTop:50,
        fontWeight:'bold',
        marginHorizontal:167,
    },
    tableHeading:{
        fontWeight:'bold',
        color:'black',
        paddingLeft:10
    },
    header:{
        // paddingLeft:10,
        borderWidth:1,
    },
    searchSections:{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor: '#DDD',padding:16,},
    formSection: {display:'flex', flexDirection: 'row', justifyContent:'center',alignItems: 'center', position: "relative",width:'100%',position:'relative'},
    formIcon: {fontSize: 24, color: "lightgray",lineHeight:42, width:42, display:'flex',justifyContent: 'center',alignItems:'center', textAlign:'center',position:'absolute',right:1,zIndex:2,},
    formInput: {flex:1, padding:8,paddingLeft:16, color:'#323232', borderWidth: 1, borderColor: 'lightgray', backgroundColor: 'white', fontSize: 15,height:44},
    textInput: {
      width: '90%',
      marginLeft: 20,
      borderWidth: 1,
      borderColor: '#c8c8c8',
      height: 50,
      borderRadius: 15,
      backgroundColor: '#fff',
      marginTop: 10,
      paddingLeft: 10
  },
  dropdownSelector: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
},
dropdownArea: {
  width: '90%',
  height: 50,
  borderRadius: 0,
  marginTop: 20,
  backgroundColor: '#fff',
  elevation: 25,
  alignSelf: 'center',
  zIndex:100
},
text: { color: '#7F7F7F', fontSize: 14, fontWeight: '500' },
    text_active: { color: "rgb(251, 144, 19)" },
});

export default History;