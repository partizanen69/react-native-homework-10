import { FC } from "react";
import Svg, { Path, Rect, G, Defs, ClipPath, SvgProps } from "react-native-svg";

export const PlusIcon: FC<SvgProps> = () => {
  return (
    <Svg width="70" height="40" viewBox="0 0 70 40" fill="none">
      <G clipPath="url(#clip0_36_119)">
        <Rect width="70" height="40" rx="20" fill="#FF6C00" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.5 13.5H34.5V19.5H28.5V20.5H34.5V26.5H35.5V20.5H41.5V19.5H35.5V13.5Z"
          fill="white"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_36_119">
          <Rect width="70" height="40" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
