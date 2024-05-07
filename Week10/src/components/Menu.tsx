import { Link } from 'react-router-dom'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import '../index.css'

const Menu = () => {
    const { t, i18n } = useTranslation() // Create a hook for the t function and i18n object to change the language 
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    return (
        <div className='menu'>
            <Link to="/">{t('Home')}</Link>
            <Link to="/about">{t('About')}</Link>
            <button onClick={() => changeLanguage('fi')}>FI</button>
            <button onClick={() => changeLanguage('en')}>EN</button>
        </div>
    )
}

// Add the Suspense component to the Menu component
export default function App () {
    return (
        <Suspense fallback="loading...">
            <Menu />
        </Suspense>
    )
}