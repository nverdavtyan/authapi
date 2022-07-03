export default function Label({  className = '', ...props }) {
    return (
        <label
            className={`${className} block text-gray-700`}
            {...props}>
        </label>
    )
}
