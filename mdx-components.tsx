import type { MDXComponents } from "mdx/types"

const components: MDXComponents = {
  h1: ({ children }) => <h1 style={{ color: "red", fontSize: "48px" }}>{children}</h1>,
}

export function useMDXComponents(): MDXComponents {
  return components
}
