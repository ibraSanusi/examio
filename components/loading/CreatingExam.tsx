import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function CreatingExam() {
  return (
    <div className="bg-yellow/80 animate-fade-in-lottie absolute top-0 left-0 flex h-full w-full transition duration-75">
      <article className="bg-purple/80 absolute inset-0 m-auto flex h-2/3 w-1/2 items-center justify-center rounded-lg">
        <DotLottieReact src="/lotties/guy-studying.lottie" autoplay loop />
      </article>
    </div>
  )
}
