function SearchInput({ value, onChange, placeholder = "Filtrer par nom..." }) {

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default SearchInput;