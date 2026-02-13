import * as React from "react";

import { Icon, type IconProps, type IconPath } from "./Icon";

/** 개별 아이콘을 생성하는 팩토리 함수 */
export function createIcon(
  displayName: string,
  path: IconPath,
): React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
> {
  const Component = React.forwardRef<SVGSVGElement, IconProps>(
    ({ color = "currentColor", ...props }, ref) => (
      <Icon ref={ref} color={color} {...props}>
        {path({ color })}
      </Icon>
    ),
  );

  Component.displayName = displayName;
  return Component;
}
