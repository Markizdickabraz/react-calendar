import { useTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className='p-3'>
            <Link className='p-3 flex gap-2 justify-center items-center' to='/'><FaArrowLeft />to Auth</Link>
            <h1 className='text-3xl text-center'>{t('This page does not exist')}</h1>
        </div>
    )
}

export default NotFound;