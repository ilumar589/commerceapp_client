import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Basket } from "../models/basket";

interface StoreContextValue {
    basket: Basket | null,
    setBasket: (basket: Basket) => void,
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    const context = useContext(StoreContext);

    if (context === undefined) {
        throw Error('Not inside the provider');
    }

    return context;
}

export function StoreProvider({children}: PropsWithChildren<any>) {
    const [basket, setBasket] = useState<Basket | null>(null);

    return (
        <StoreContext.Provider value={{basket, setBasket}}>
            {children}
        </StoreContext.Provider>
    )
}