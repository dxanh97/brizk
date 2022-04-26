import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

interface Props {
  fontSize?: number;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fontStyle?: 'normal' | 'italic';
  numeric?: boolean;
  textProps?: TextProps;
  styles?: StyleProp<TextStyle>;
}

const Typography: React.FC<Props> = ({
  fontSize,
  fontWeight,
  fontStyle,
  numeric,
  textProps,
  styles,
  children,
}) => (
  <Text
    {...textProps}
    style={[
      getStyles({
        fontSize,
        fontStyle,
        fontWeight,
        numeric,
      }).root,
      styles,
    ]}
  >
    {children}
  </Text>
);

type CustomProps = Omit<Props, 'styles' | 'textProps'>;

const getPlatformSpecificFontName = (fontName: string) => {
  if (Platform.OS === 'ios') {
    return fontName;
  }
  return fontName.toLowerCase().replace(/ /g, '');
};

const getStyles = (props: CustomProps) => {
  const {
    fontSize = 16,
    fontWeight = 400,
    fontStyle = 'normal',
    numeric = false,
  } = props;
  return StyleSheet.create({
    root: {
      fontFamily: getPlatformSpecificFontName(numeric ? 'PT Mono' : 'Mulish'),
      fontSize,
      fontWeight: `${fontWeight}`,
      fontStyle,
    },
  });
};
export default Typography;
