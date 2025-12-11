import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

vi.mock("react", async () => {
    const actual = await vi.importActual<typeof import("react")>("react");
    const actualAny = actual as any;

    if (typeof actualAny.useOptimistic === "function") {
        return actualAny;
    }

    const useOptimistic = <T, A>(
        initialState: T,
        reducer?: (state: T, action: A) => T
    ): [T, (action: A) => void] => {
        const [state, setState] = actual.useState<T>(initialState);

        const dispatch = (action: A) => {
            if (reducer) {
                setState((prev) => reducer(prev, action));
            } else {
                setState(action as unknown as T);
            }
        };

        return [state, dispatch];
    };

    return {
        ...actual,
        useOptimistic,
    } as typeof actual & { useOptimistic: typeof useOptimistic };
});

if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }),
    });
}
