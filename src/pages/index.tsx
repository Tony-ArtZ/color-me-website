import { GetServerSideProps } from 'next'
import Image from 'next/image'

export default function Home({data}:{data:{result:[number[]]}}) {
  const colors = data.result
  return (
    <main className='h-screen w-screen' style={{backgroundColor:`rgb(${colors[4].toString()})`}}>
      <button style={{backgroundColor:`rgb(${data.result[0].toString()})`}}>AASS</button>
      <button style={{backgroundColor:`rgb(${data.result[1].toString()})`}}>AASS</button>
      <button style={{backgroundColor:`rgb(${data.result[2].toString()})`}}>AASS</button>
      <button style={{backgroundColor:`rgb(${data.result[3].toString()})`}}>AASS</button>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await fetch("http://colormind.io/api/", {method:"POST", body:JSON.stringify({model:"default"})})
  const data = await res.json()
  console.log(data)

  return {
    props:{
      data:data
    }
  }
}
