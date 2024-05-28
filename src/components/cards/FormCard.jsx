const FormCard = (props) => {
    return (
        <div
            className='rounded-xl p-5 items-center w-64 sm:w-72 md:w-96 lg:w-96
                justify-center shadow-lg bg-zinc-800 bg-opacity-60'
        >
            <form onSubmit={props.handleSubmit}>
                {props.formContent}
                <input
                    type='submit'
                    value={props.buttonName}
                    className='w-full py-2 px-10 mt-5 rounded-md 
                        uppercase font-bold
                        hover:cursor-pointer
                        text-white bg-sky-600 
                        active:bg-sky-300 hover:bg-sky-500
                    '
                />
            </form>
            <footer>
                {props.footer}
            </footer>
        </div>
    )
}

export default FormCard