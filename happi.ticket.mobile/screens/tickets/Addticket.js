import * as React from "react";
import {
  Text, StyleSheet, View, Image, Pressable,
  ImageBackground, RefreshControl, FlatList, Dimensions, SafeAreaView, TextInput, TouchableOpacity, Modal, StatusBar, Linking, Button, ScrollView, TouchableHighlight, Platform, ActivityIndicator
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import RichtextEditor from "../../components/RichtextEditor";
import { useSelector, useDispatch } from "react-redux";
import { getDepartments, getTypeofIssues, getPriority, addTickets, setDescription, getComments } from "../../reducers/ticketsReducer"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MultiSelect } from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import { Stack, IconButton } from "@react-native-material/core";

const Addticket = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userData, setUserData] = React.useState()
  const [ticketDetails, setTicketDetails] = React.useState({ title: '', description: undefined, typeof_issue: undefined, level: undefined, dept_id: [], created_by: undefined })
  const departmentList = useSelector((state) => state.tickets.departmentList);
  const issuesList = useSelector((state) => state.tickets.issuesList);
  const priorityList = useSelector((state) => state.tickets.priorityList);
  const Description = useSelector(state => state.tickets.description);
  const loading = useSelector(state => state.tickets.loading);
  const [titleError, setTitleError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);
  const [typeofIssueError, setTypeofIssueError] = React.useState(false);
  const [priorityError, setPriorityError] = React.useState(false);
  const [departmentError, setDepartmentError] = React.useState(false);
  const [buttonDisable, setButtonDisable] = React.useState(false)
  const [selectedFile, setSelectedFile] = React.useState([])
  const [showAddFile, setShowAddFile] = React.useState(false)
  const [btnLoading, setBtnLoading] = React.useState(false)



  React.useEffect(() => {
    dispatch(getDepartments())
    dispatch(getTypeofIssues())
    dispatch(getPriority())

  }, [])

  const addTicket = () => {
    setButtonDisable(true)
    if (ticketDetails.title.length == 0) {
      setTitleError(true)
      setButtonDisable(false)
    } else if (ticketDetails.dept_id.length == 0) {
      setDepartmentError(true);
      setButtonDisable(false)
    } else if (ticketDetails.typeof_issue == undefined) {
      setTypeofIssueError(true)
      setButtonDisable(false)
    } else if (ticketDetails.level == undefined) {
      setPriorityError(true)
      setButtonDisable(false)
    } else if (Description == '') {
      setDescriptionError(true)
      setButtonDisable(false)
    } else {
      AsyncStorage.getItem('user').then(value => {
        if (value == "" || value == null || value == undefined) {
          console.log(value)
        } else {
          setUserData(JSON.parse(value));
          let userData = JSON.parse(value);
          let ticketObj = ticketDetails;
          ticketObj = { ...ticketObj, created_by: userData._id, description: Description, attachmentFile: selectedFile }
          dispatch(addTickets(ticketObj)).then((res) => {
            dispatch(setDescription(''))
            navigation.navigate('HappiTickets')
            setButtonDisable(false)
          })
          //  dispatch(getTicketList(JSON.parse(value)))
        }
      })
    }
  }

  const renderDataItem = (item) => {
    return (
      <View style={[styles.item]}>
        {/* <MaterialCommunityIcons name="priority-high" color="black" size={20} style={styles.icon} /> */}
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };
  let miltipleDocs = []
  const selectFile = async () => {
    try {

      const doc = await DocumentPicker.pickSingle()
      // miltipleDocs.push(doc)
      setSelectedFile([...selectedFile, doc])
      setShowAddFile(true)
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User Cancelled the upload', error)
        setShowAddFile(false)
      }
      else {
        console.log('error', error)
        setShowAddFile(false)
      }
    }
  }
  const removeFile = (name) => {
    let allfiles = selectedFile.filter((item) => item.name !== name);
    setSelectedFile(allfiles)
    // setShowAddFile(false); 
    setBtnLoading(false)
  }
  return (

    <View >
      <ScrollView>
        <View style={{ alignSelf: 'center', top: 15, width: 300 }}>
          <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left' }]}>Title</Text>
          {titleError && <Text style={{ color: 'red' }}>Enter Title</Text>}
          <TextInput placeholder="Enter Title" placeholderTextColor={'#000'} style={styles.searchInput} onChangeText={nextValue => { setTicketDetails({ ...ticketDetails, title: nextValue }); setTitleError(false) }} />
        </View>
        <View style={{ alignSelf: 'center', top: 20, width: 300 }}>
          <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', marginTop: 10 }]}>Department</Text>
          {departmentError && ticketDetails.dept_id.length == 0 && <Text style={{ color: 'red' }}>Select Atleast One Department</Text>}

          {/* <MultipleSelectList
                    setSelected={(val) => { setTicketDetails({ ...ticketDetails, dept_id: val }); }}
                    data={departmentList  }
                    save="key"
                    search={false}
                    boxStyles={styles.textInput}
                    dropdownStyles={{
                        width: '90%', borderWidth: 1,
                        borderColor: '#c8c8c8', backgroundColor: '#fff'
                    }}
                    placeholder='Select'
                    inputStyles={{ left: -5, top: 2, }}
                    onSelect={() => console.log('selected')}
                /> */}
          <MultiSelect
            style={styles.filterDropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={departmentList}
            labelField="label" valueField="value" placeholder="Select Department"
            value={ticketDetails.dept_id}
            search={true}
            // search
            searchPlaceholder="Search..."
            onChange={item => {
              setTicketDetails({ ...ticketDetails, dept_id: item });
            }}
            renderLeftIcon={() => (
              <MaterialCommunityIcons name="priority-high" color="black" size={20} style={styles.icon} />
            )}

            renderItem={renderDataItem}
            renderSelectedItem={(item, unSelect) => (
              <TouchableOpacity onPress={() => unSelect && unSelect(item)} style={{ padding: 2, }}>
                <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <AntDesign color="black" name="delete" size={16} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{ alignSelf: 'center', top: 20, width: 300 }}>
          <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', marginTop: 10 }]}>Type Of Issue</Text>
          {typeofIssueError && ticketDetails.typeof_issue == undefined && <Text style={{ color: 'red' }}>Select Type of Issue</Text>}

          <SelectList
            setSelected={(val) => { setTicketDetails({ ...ticketDetails, typeof_issue: val }); }}
            data={issuesList}
            save="key"
            search={true}
            boxStyles={styles.textInput}
            dropdownStyles={{
              width: '90%', borderWidth: 1,
              borderColor: '#c8c8c8', backgroundColor: '#fff'
            }}
            placeholder='Select'
            dropdownTextStyles={{ color: '#000', textTransform: 'capitalize' }}
            inputStyles={{ color: "#000", left: -5, top: 2, }}
            onSelect={() => console.log('selected')}
          />
        </View>
        <View style={{ alignSelf: 'center', top: 20, width: 300 }}>
          <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', marginTop: 10 }]}>Priority Level</Text>
          {priorityError && ticketDetails.level == undefined && <Text style={{ color: 'red' }}>Select Priority</Text>}
          <SelectList
            setSelected={(val) => { setTicketDetails({ ...ticketDetails, level: val }) }}
            data={priorityList}
            save="key"
            search={false}
            boxStyles={styles.textInput}
            dropdownStyles={{
              width: '90%', borderWidth: 1,
              borderColor: '#c8c8c8', backgroundColor: '#fff'
            }}
            dropdownTextStyles={{ color: '#000', textTransform: 'capitalize' }}
            placeholder='Select'
            inputStyles={{ color: '#000', left: -5, top: 2, }}
            onSelect={() => console.log('selected')}
          />
        </View>

        <View style={{ alignSelf: 'center', top: 20, width: 330, paddingLeft: 15, marginBottom: 20 }}>

          <RichtextEditor initialHTML='' />
          {descriptionError && Description == '' && <Text style={{ color: 'red' }}>Enter Description</Text>}
        </View>

        <View
          style={[
            styles.attachmentsFrame,
            styles.attachmentsFrameSpaceBlock, styles.mt10
          ]}
        >
          <View style={{ alignSelf: 'center', top: 20, width: 300 }}>
            <Text style={[styles.text, styles.text_active, { color: '#000', textAlign: 'left', marginTop: 10 }]}>
              Attachments
            </Text>
          </View>
          <View style={[styles.headingFrameInner, styles.ml10]} >
            <Pressable
              style={[styles.wrapper,
              styles.wrapperFlexBox, { left: 3 }
              ]}
              onPress={selectFile}
            >

              <Ionicons
                name='add-circle'
                size={42}
                solid
                color='gray'
              />
            </Pressable>
          </View>
        </View>

        {
          showAddFile ?
            <View style={{ alignSelf: 'center', width: 300 }}>
              {selectedFile && <>
                {selectedFile.map((eachDoc, id) => {
                  return (
                    <View style={[styles.selectedFile, { flexDirection: 'row' }]}>
                      <Text style={{color:'#000'}}>{eachDoc?.name?.length < 20 ? `${eachDoc?.name}` : `${eachDoc?.name?.substring(0, 25)}...`}</Text>
                      <IconButton onPress={() => { removeFile(eachDoc?.name) }} icon={props => <Ionicons name="close-circle" {...props} />} style={{ marginLeft: 20 }} />
                    </View>
                  )
                })}
                {/* <Button  loading={btnLoading} disabled={btnLoading} title='Upload Attachment' ></Button> */}
              </>}

            </View> : null}
        <View style={{ alignSelf: 'center', width: 300, marginBottom: 20 }}>
          <TouchableHighlight
            style={styles.logout}
            onPress={() => addTicket()}
            disabled={buttonDisable}
          >
            <View
              style={{
                ...styles.button
                // backgroundColor: isLoading ? "#4caf50" : "#8bc34a",
              }}
            >
              {loading && <ActivityIndicator size="small" color="#fff" />}
              <View >
                <Text style={{ fontWeight: '700', color: '#fff' }}>Add</Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
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
  text: { color: '#7F7F7F', fontSize: 14, fontWeight: '500' },
  text_active: { color: "rgb(251, 144, 19)" },
  textInput: {
    borderWidth: 1,
    borderColor: '#c8c8c8',
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 10
  },
  searchInput: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#8e8e8e',
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 15,
    color: '#000'
  },
  logout: { width: '35%', height: 40, backgroundColor: 'rgb(251, 144, 19)', justifyContent: 'center', alignItems: 'center', top: 10, borderRadius: 5 },
  filterDropdown: {
    backgroundColor: 'white', margin: 5, borderRadius: 12, padding: 8, paddingLeft: 12, paddingRight: 12, borderWidth: 0.6, borderColor: '#DBDBDB', shadowColor: '#000',
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.2, shadowRadius: 1.41, elevation: 2,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#000"
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#000"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "#000"
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 14,
    color: "#000"
  },
  selectedFile: {
    borderColor: '#c8c8c8',
    borderRadius: 5,
    borderWidth: 1,
    padding: 5,
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // left:25,
    // paddingRight:35,
    // width:'90%'
  },
  headingFrameInner: { marginLeft: 'auto', right: 40, bottom: 10 },
  attachmentsWrapper: { marginLeft: 35 },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: 50,
    height: 70,
    // borderWidth: 1,
    // borderColor: "#666",
    // borderRadius: 10,
  }
});

export default Addticket;
