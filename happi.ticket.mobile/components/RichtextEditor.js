import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import {
    actions,
    RichEditor,
    RichToolbar,
  } from "react-native-pell-rich-editor";
   import { setDescription } from '../reducers/ticketsReducer';
  import { useDispatch, useSelector } from 'react-redux';

export default function RichtextEditor(props) {
    const richText = React.useRef();
    const dispatch = useDispatch();

    const [showDescError, setShowDescError] = React.useState(false);
    const [taskDesc, setTaskDesc] = React.useState('');

    const richTextHandle = (descriptionText) => {
        if (descriptionText) {
          let desc= descriptionText.replace(/&nbsp;/g,'')
          setShowDescError(false);
          setTaskDesc(desc);
          dispatch(setDescription(desc))
        } else {
          setShowDescError(true);
          setTaskDesc("");
          dispatch(setDescription(""))
        }
      };
    return (
        <View style={styles.richTextContainer}>
                <ScrollView>
                  <RichEditor
                    ref={richText} // from useRef()
                    onChange={richTextHandle}
                    placeholder="Write your Description here :)"
                    androidHardwareAccelerationDisabled={true}
                    style={styles.richTextEditorStyle}
                    initialHeight={140}
                    initialContentHTML = {props.initialHTML}
                  />
                  </ScrollView>
                  <RichToolbar
                    editor={richText}
                    selectedIconTint="#873c1e"
                    iconTint="#312921"
                    actions={[
                      actions.setBold,
                      actions.setItalic,
                      actions.setStrikethrough,
                      actions.setUnderline,
                    ]}
                    style={styles.richTextToolbarStyle}
                  />
                </View>
    );
}

const styles = StyleSheet.create({
    richTextContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        marginBottom: 10,
        marginTop: 20,
        paddingRight:20 ,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        
        // height:200
      },
      richTextEditorStyle: {
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 20,
       
      },
      richTextToolbarStyle: {
        backgroundColor: "#fff",
        borderColor: "#000",
        borderRadius:10,
        borderWidth: 1,
      },
      richTextToolbarStyle: {
        backgroundColor: "#fff",
        borderColor: "#000",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
        borderBottomWidth:0
      },
})