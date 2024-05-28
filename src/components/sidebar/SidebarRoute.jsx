import { Link } from 'react-router-dom'

import { IconContext } from "react-icons";

const SidebarRoute = (params) => {
    return (
        <Link
            className={`flex flex-row gap-3 items-center 
                    font-bold rounded-md cursor-pointer transition-colors
                    text-slate-400 hover:text-sky-500 active:text-sky-400 focus:text-sky-400
                    group hover:outline hover:outline-1 hover:outline-sky-500
                    group focus:outline focus:outline-1 focus:outline-sky-500
                    ${params.hide ? 'hidden' : '' }
                `
            }
            to={params.route}
        >
            <div className='rounded-sm p-1 
                    text-slate-400 group-hover:text-sky-300 
                    group-focus:text-sky-300 transition-colors block 
                '
            >
                {
                    <IconContext.Provider value={{ size: 32 }}>
                        {params.icon}
                    </IconContext.Provider>
                }
            </div>
            <div className='px-3'> {params.name} </div>
        </Link>
    )
}

export default SidebarRoute