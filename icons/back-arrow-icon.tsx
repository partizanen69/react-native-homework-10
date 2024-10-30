import { FC } from "react";
import { Path, Svg, SvgProps } from "react-native-svg";

export const BackIcon: FC<SvgProps> = ({ color }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 12H4"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 18L4 12L10 6"
        stroke="#212121"
        strokeOpacity="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
