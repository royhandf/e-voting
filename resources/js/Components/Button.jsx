export default function Button({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button {...props} className={className} disabled={disabled}>
            {children}
        </button>
    );
}
