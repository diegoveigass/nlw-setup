import { Check } from 'phosphor-react'

export function NewHabitForm() {
  return (
    <form className="w-full flex flex-col mt-6">
      <label
        className="text-base font-semibold mt-4 leading-tight"
        htmlFor="title"
      >
        Qual seu comprometimento?
      </label>
      <input
        className="bg-zinc-800 placeholder:text-zinc-400 p-4 rounded-lg mt-3 text-white"
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
      />

      <label htmlFor="" className="text-base font-semibold mt-4 leading-tight">
        Qual a recorrência?
      </label>

      <button
        type="submit"
        className="mt-6 h-14 rounded-lg gap-3 flex items-center justify-center font-semibold bg-green-600 hover:bg-green-500"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  )
}
