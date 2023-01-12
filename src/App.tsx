import { useCounterStore } from "./store/counterStore"
import shallow from 'zustand/shallow'
import { useEffect } from "react"

export default function App() {
  //de todos los datos del estado, devolveme el .count
  const count = useCounterStore((state) => state.count)
  const title = useCounterStore((state) => state.title)

  //tambien puedo obtener objeto
  const {counter, name, posts} = useCounterStore((state) => ({
    counter: state.count,
    name : state.title,
    posts: state.unDatoAsincrono
  }), shallow)
  const {increment, getDatoAsincrono} = useCounterStore() //esto me devuelve de por si todo el estado, puedo agarrar lo que necesito

  console.log(counter)
  console.log(name)

  useEffect(() => {
    getDatoAsincrono()
  }, [])
  
  return (
    <div>
      <h1>{title} : {count}</h1>
      <button onClick={()=>{
        increment(10)
      }}>
        Incrementar valor
      </button>
    </div>
  )
}
