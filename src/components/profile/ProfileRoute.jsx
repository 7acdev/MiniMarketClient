import { Link } from 'react-router-dom'

const ProfileRoute = (params) => {
    return (
        <Link
            to={params.route}
            className='text-md text-center font-bold rounded-lg p-2
                text-slate-400
                hover:text-zinc-50
                hover:bg-sky-600
                active:bg-sky-400
            '
            onClick={params.click}
        >
            {params.name}
        </Link>
    )
}

export default ProfileRoute