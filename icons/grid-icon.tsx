import { Path, Rect, Svg, SvgProps } from "react-native-svg";

export const GridIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
      <Rect width="24" height="24" transform="translate(8 8)" fill="white" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 11H18V18H11V11Z"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 11H29V18H22V11Z"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 22H29V29H22V22Z"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 22H18V29H11V22Z"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
