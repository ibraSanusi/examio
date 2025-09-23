import { ReactNode } from "react"

export default function MdxLayout({ children }: { children: ReactNode }) {
  // Create any shared layout or styles here
  return <div style={{ color: "blue" }}>{children}</div>
}
