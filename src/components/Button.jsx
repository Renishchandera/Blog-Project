
function Button({children,
                type = 'button',
                bgColor = 'bg-blue-600',
                textColor = 'text-white',
                className = '',
                ...props

})
{
    return (
        <button type={type} className={`btn btn-primary ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    )
}


export default Button;