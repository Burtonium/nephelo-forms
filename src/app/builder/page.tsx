import dynamic from 'next/dynamic';

const Builder = dynamic(() => import('./components/FormBuilder'), { ssr: false });

export default function Home() {

  return (
    <main>
      <Builder />
    </main>
  )
}