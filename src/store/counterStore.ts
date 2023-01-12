import create from 'zustand'    //zustand es como redux, pero no necesito crear un provider, meto los distintos estados aca dentro de la carpeta store

interface UnDatoAsincrono {
        id: number
        title: string
        body: string
}

interface CounterState {
        count: number
        title: string
        increment: (value:number) => void
        unDatoAsincrono: UnDatoAsincrono[]
        getDatoAsincrono: () => Promise<void>
        clearStore: () => void
}


//en este objeto que devuelve es el estado que comparto en la aplicacion
export const useCounterStore = create<CounterState>((set, get) => ({
        count:10,
        title: 'Un titulo',
        increment: (value:number) => set(state => ({    //le paso una funcion al objeto del estado, que tiene set para actualizar datos
                ...state,
                count: state.count + value
        })),
        unDatoAsincrono: [],
        getDatoAsincrono: async () => {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts')
                const posts = await res.json()
                set(state => ({
                        ...state,
                        unDatoAsincrono: posts
                }))
        },
        clearStore: () => {
                set({}, true)//limpia todo el estado
        },
        multiplicar: (value: number) => {
                const count = get().count
                set({count: count * value})
        }
}))