import { Platform } from "react-native";

const GlobalStyles = {
/* fonts */
FontFamily: {
  footnoteRegular: Platform.OS==='android'?"Nunito":null,
  openSans: Platform.OS==='android'?"Open Sans":null,
  raleway: "Raleway",
},
/* font sizes */
FontSize: {
  size_xs: 8,
  size_sm: 10,
  footnoteRegular_size: 12,
  testingsize:11,
  tasttimesize: 13,
  size_lg: 14,
  calloutBold_size: 16,
  size_2xl: 18,
},
/* Colors */
Color: {
  open:'#008055',
  progress:'#dc8181',
  review:'#8187dc',
  circlebg:'#f0f0f0',
  closed:'#537854',
  gray_100: "#fffdfd",
  gray_200: "#fffafa",
  systemBackgroundSecondary: "#fbfbfb",
  gray_400: "#bbcdf0",
  gray_500: "#b2ccff",
  bg_gray:"#e9e9e9",
  gray_600: "#acacac",
  labelsColorsPrimary: "#22292e",
  gray_800: "rgba(251, 251, 251, 0)",
  white: "#fff",
  violet: "#4f87f8",
  pink_100: "#f0bbbb",
  pink_200: "#c5a5a5",
  turquoise: "#64f8dd",
  gold: "#ffd569",
  indigo: "#0b56ed",
  black: "#000",
  brown_100: "#d26161",
  cyan: "#00ffff",
  cyepro_pink: "#f0206c",
},
/* Paddings */
Padding: {
  padding_xs: 5,
  padding_sm: 10,
  padding_md: 19,
  padding_xl: 14,
  padding_main:30,

},
/* Margins */
Margin: {
  margin_sm: 2,
  margin_md: 5,
  margin_lg: 10,
  maegin_xl:15,
  margin_xxl:20,

  m_2xs: 0,
  m_xs: 2,
  m_sm: 5,
  m_smm:12,
  m_md: 10,
  m_lg: 15,
  m_xl: 17,
  m_dummy: 150,
},
/* border radiuses */
Border: {
  br_xs: 6,
  br_sm: 8,
  br_md: 12,
  br_main:20,
  br_lg: 100,
  br_2xs: 5,
},
version:{color:'lightgray',
fontSize:10,
marginLeft:'auto',
marginRight:10 }
};
export default GlobalStyles;