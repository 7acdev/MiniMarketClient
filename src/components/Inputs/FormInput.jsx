const FormInput = (props) => {
    return (
        <div className='items-center'>
            <label className={`uppercase block text-xl font-bold py-${props.py} text-sky-400`}>
                {props.name}
            </label>
            <input
                type={props.type}
                min={props.min}
                max={props.max}
                step={props.step}
                placeholder={props.placeholder}
                className='w-full p-3 rounded-xl border focus:outline-double
                    bg-opacity-25 hover:bg-opacity-100 active:bg-opacity-100
                    bg-zinc-900 
                    border-sky-500 
                    focus:border-sky-400 
                    text-sky-200
                '
                defaultValue={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default FormInput