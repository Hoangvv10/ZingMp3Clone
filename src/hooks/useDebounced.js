import { useEffect, useRef, useState } from 'react';

function useDebounced(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    const handler = useRef();

    useEffect(() => {
        handler.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(handler.current);
    }, [value]);

    return debouncedValue;
}

export default useDebounced;
