import Link from 'next/link'
import Image from 'next/image';
import travolta from 'src/assets/images/4ea.gif';
 
export default function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center space-y-8 py-10">
      <Image alt="Travolta looking confused" src={travolta} />
      <h2 className='font-bold font-title text-4xl text-center'>Either you&apos;re lost or I made a mistake.</h2>
      <Link className='btn' href="/">Go home</Link>
    </div>
  )
}