import { Components } from "react-markdown"

export const components: Components = {
  li({ children }) {
    const raw = String(children)
    //   console.log("typeof de children: ", typeof children)
    console.log({ children })

    // Caso: checkbox
    if (raw.startsWith("[object Object]") || raw.startsWith("[x]")) {
      const label = raw
        .replace(/\[object Object\],?\s*/g, "")
        .replace(/^,?\s*/, "")
        .trim()
      return (
        <li className="w-fit list-none">
          <label className="flex items-center gap-2">
            <input id={`${label}-id`} name={label} type="checkbox" />
            {label}
          </label>
        </li>
      )
    }

    // Caso: radio
    if (raw.startsWith("( )") || raw.startsWith("(x)")) {
      const label = raw.replace("( )", "").replace("(x)", "").trim()
      return (
        <li className="w-fit list-none">
          <label className="flex items-center gap-2">
            <input type="radio" name="radio-group" />
            {label}
          </label>
        </li>
      )
    }

    // Caso: ShortAnswer
    if (raw.includes("<ShortAnswer />")) {
      if (!Array.isArray(children)) return
      const sentence = children && (children[1].props.children as string)
      return (
        <li className="w-fit">
          <p>{sentence}</p>
          <textarea
            name={sentence.replaceAll(" ", "-")}
            rows={2}
            className="w-full rounded border p-2"
            placeholder="Redacta tu respuesta aquí..."
          />
        </li>
      )
    }

    // Caso: Essay
    if (raw.includes("<Essay />")) {
      if (!Array.isArray(children)) return
      const sentence = children && (children[1].props.children as string)
      return (
        <li className="w-fit">
          <p>{sentence}</p>
          <textarea
            name={sentence.replaceAll(" ", "-")}
            rows={6}
            className="w-full rounded border p-2"
            placeholder="Redacta tu respuesta aquí..."
          />
        </li>
      )
    }

    // Fallback normal
    return <li>{children}</li>
  },
}
