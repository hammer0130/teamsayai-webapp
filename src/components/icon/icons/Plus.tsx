import { createIcon } from "../createIcon";

export const PlusIcon = createIcon("PlusIcon", ({ color }) => (
  <>
    <path
      d="M12 5V19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12H19"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
));
