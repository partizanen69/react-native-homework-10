import { FC } from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export const UserIcon: FC<SvgProps> = () => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <Path
        d="M28 29V27C28 24.7909 26.2091 23 24 23H16C13.7909 23 12 24.7909 12 27V29"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 19C22.2091 19 24 17.2091 24 15C24 12.7909 22.2091 11 20 11C17.7909 11 16 12.7909 16 15C16 17.2091 17.7909 19 20 19Z"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
