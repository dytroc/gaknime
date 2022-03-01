import { createContext, useContext } from 'react';

const defaultValue = {
    setBackground: (value) => {},
};
const GanimeContext = createContext(defaultValue);

export default function GanimeContextWrapper({ children, overwrittingValues }) {
    return <GanimeContext.Provider value={{
        ...defaultValue,
        ...overwrittingValues
    }}>{children}</GanimeContext.Provider>
}

export function useGanimeContext() {
    return useContext(GanimeContext);
}