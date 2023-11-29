'use client';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import DarkModeToggle from 'src/app/components/DarkModeToggle';
import classNames from 'classnames';
import type { User } from '@prisma/client';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

// const navigation = [
//   { name: 'Forms', href: '/forms', current: false  }
// ]

export default function Navbar({ user }: { user: User | null }) {
  return (
    <Disclosure as="nav" className="bg-zinc-800 text-zinc-300">
      {({ open }) => (
        <>
          <div className="wrapper">
            <div className="flex h-16 justify-between">
              <div className="flex items-center justify-center">
                <div className="flex">
                  <Link
                    href="/">
                    <img
                      height={64}
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=400"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center">
                  {/* {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? ' text-orange-400 bg-zinc-900/50' : 'text-gray-300 hover:text-white hover:bg-orange-400',
                        'h-full flex items-center text-sm font-semibold px-6'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))} */}
                </div>
              </div>
              <div className="flex items-center md:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 hover:bg-zinc-700 hover:text-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FontAwesomeIcon icon={faClose} className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <FontAwesomeIcon icon={faBars} className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="items-center hidden md:flex justify-between">
                  {!user && (
                    <>
                      <div className="flex-shrink-0 flex items-center space-x-3 p-3">
                        <DarkModeToggle />
                      </div>
                      <div className="flex-shrink-0">
                      <Menu as="div" className="relative ml-3">
                        <Menu.Button className="relative btn">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open sign in menu</span>
                          Sign in
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800/50 backdrop-blur-md dark:text-zinc-300 text-zinc-700">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? 'bg-gray-100 dark:bg-zinc-600/50 backdrop-blur-md' : '',
                                    'block px-4 py-2 text-sm w-full text-left'
                                  )}
                                  onClick={() => signIn('google', { callbackUrl: '/' })}>
                                  With Google
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                      </div>
                  </>
                )}
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {user && (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-zinc-800 text-sm">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {user?.image? (
                            <div className='rounded-full overflow-hidden'>
                              <Image className='rounded-full' width={32} height={32} alt="Profile picture" src={user.image} />
                            </div>
                          ): (
                            <FontAwesomeIcon icon={faUser} />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800/50 backdrop-blur-md dark:text-zinc-300 text-zinc-700">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href='/profile'
                                className={classNames(
                                  active ? 'bg-gray-100 dark:bg-zinc-600/50' : '',
                                  'block px-4 py-2 text-sm '
                                )}
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button className={classNames(
                                active ? 'bg-gray-100 dark:bg-zinc-600/50' : '',
                                'block px-4 py-2 text-sm w-full text-left'
                              )} onClick={() => signOut()}>
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            <div className='px-4 py-2 text-sm flex justify-between items-center'>
                              <span>Dark Mode</span>
                              <DarkModeToggle />
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden">
            {/* <div className="pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-zinc-900/50 text-orange-400 ' : 'text-gray-300 hover:bg-zinc-700 hover:text-white',
                    'block px-5 py-3 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div> */}
            <div className="border-gray-700 pb-3 pt-4">
              <div >
                {user && (
                  <>
                    <Disclosure.Button
                      className="block px-5 py-3 w-full text-base font-medium text-gray-400 hover:bg-zinc-700 hover:text-white"
                    >
                      <Link href="/profile" className='flex space-x-3 items-center'>
                        {user.image ? (
                          <Image className='rounded-full' width={32} height={32} alt="Profile picture" src={user.image} />
                        ) : (
                          <FontAwesomeIcon icon={faUser} />
                        )}
                        <span className="text-base font-medium text-white">
                          Signed in as {user.name}
                        </span>
                      </Link>
                    </Disclosure.Button>
                    <Disclosure.Button
                      onClick={() => signOut()}
                      className="block px-5 py-3 w-full text-left text-base font-medium hover:bg-zinc-700 hover:text-white"
                    >
                      Sign out
                    </Disclosure.Button>
                  </>
                )}
              </div>
              <div className='flex items-center justify-between px-5 py-3 text-base text-gray-300 font-medium hover:bg-zinc-700 hover:text-white'>
                <span>Dark Mode</span>
                <DarkModeToggle />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
