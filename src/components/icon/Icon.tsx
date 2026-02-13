import * as React from "react";

import clsx from "clsx";

/** 아이콘 SVG path를 정의하는 타입 */
export type IconPath = (props: { color: string }) => React.ReactNode;

/** Icon 컴포넌트 Props */
export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** 아이콘 크기 (width, height). 기본값 24 */
  size?: number | string;
  /** 아이콘 색상. 기본값 currentColor */
  color?: string;
  /** SVG children (path 등) — createIcon으로 생성 시 자동 주입 */
  children?: React.ReactNode;
}

/** 기본 Icon 컴포넌트 */
export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      size = 24,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      color,
      className,
      children,
      viewBox = "0 0 24 24",
      ...restProps
    },
    ref,
  ) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      className={clsx("ui-icon", className)}
      {...restProps}
    >
      {children}
    </svg>
  ),
);

Icon.displayName = "Icon";
