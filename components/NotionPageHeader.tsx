import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import * as types from 'notion-types'
import { IoMoonSharp } from '@react-icons/all-files/io5/IoMoonSharp'
import { IoSunnyOutline } from '@react-icons/all-files/io5/IoSunnyOutline'
import cs from 'classnames'
import { Search } from 'react-notion-x'

import { isSearchEnabled } from '@/lib/config'
import { useDarkMode } from '@/lib/use-dark-mode'

import styles from './styles.module.css'

const ToggleThemeButton = () => {
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  const onToggleTheme = React.useCallback(() => {
    toggleDarkMode()
  }, [toggleDarkMode])

  return (
    <div
      className={cs('breadcrumb', 'button', !hasMounted && styles.hidden)}
      onClick={onToggleTheme}
    >
      {hasMounted && isDarkMode ? <IoMoonSharp /> : <IoSunnyOutline />}
      <p>Toggle Theme</p>
    </div>
  )
}

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  // const { components, mapPageUrl } = useNotionContext()

  // if (navigationStyle === 'default') {
  //   return <Header block={block} />
  // }

  return (
    <>
      <header className='notion-header'>
        <div className='notion-nav-header'>
          {/* <Breadcrumbs block={block} rootOnly={true} /> */}

          <Link href={'/'}>
            <div className='header-title'>
              <Image
                src={'/logo.png'}
                alt='Site Logo'
                className='logo'
                width={50}
                height={50}
              />
              <h2>Talking Points for Life</h2>
            </div>
          </Link>

          <div className='notion-nav-header-rhs breadcrumbs'>
            <ToggleThemeButton />

            {isSearchEnabled && <Search block={block} title={'Search'} />}
          </div>
        </div>
      </header>
      <section className='pt-10 max-w-3xl lg:max-w-7xl mx-auto px-4 z-50 text-center text-white'>
        <h1 className='text-6xl text-pink-900 pb-4 font-bold'>
          Talking Points for Life
        </h1>
        <div className='text-xl max-w-5xl mx-auto text-black'>
          <p>
            How to answer life&apos;s toughest questions, draw boundaries, ask
            for what you want, and more.
          </p>
          <p>
            Too many people are left with little choice but to scroll through
            Reddit threads and Quora posts when looking for advice on what to
            say. Communication is tricky. We all bring our own biases, emotions
            and histories to the table.
          </p>
          <p>
            This site will help you navigate those tricky subjects, allowing you
            to build healthier and happier relationships.
          </p>
        </div>
      </section>
    </>
  )
}
