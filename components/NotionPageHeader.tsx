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

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}
