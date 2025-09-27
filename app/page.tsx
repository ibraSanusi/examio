import Subject from "@/components/Subject"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion"
import data from "@/app/assets/data.json"
import GradeForm from "@/components/GradeForm"

export default function HomePage() {
  return (
    <section className="m-auto flex h-full w-full flex-col gap-8">
      <h2 className="text-2xl">EXMAIO</h2>
      <div>
        <h3 className="text-xl">{data.grades[0].name}</h3>
        <p className="italic">Escoge la asignatura y los temarios que quieres cursar.</p>
      </div>

      <Accordion className="space-y-2" collapsible type="single">
        {data.grades[0].subjects.map((grade, i) => (
          <AccordionItem key={`${grade.name}-${i}`} className="space-y-2" value={`item-${i}`}>
            <AccordionTrigger asChild>
              <Subject name={grade.name} />
            </AccordionTrigger>
            <AccordionContent>
              <GradeForm grade={grade} i={i} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
