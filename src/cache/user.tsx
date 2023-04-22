import { useState, useContext, useEffect, ReactElement } from "react";
import { UserContext } from "src/contexts/user-context";

export type SetUser = React.Dispatch<React.SetStateAction<any>> | null;
export type User = {};

const UserWrap = ({
    children,
}: {
    children: ReactElement[] | ReactElement;
}): ReactElement => {
    const [user, setUser] = useState([]);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};

export default UserWrap;

const registerUser =
    (setUser: SetUser) =>
    (email: string, password: string, shouldRemember: boolean) =>
        fetch("/api/register", {
            method: "PUT",
            body: JSON.stringify({ email, password, shouldRemember }),
        })
            .then(async (response) =>
                response.ok
                    ? response.json()
                    : Promise.reject({
                          status: response.status,
                          body: await response.json(),
                      })
            )
            .then((user) => {
                if (user) {
                    sessionStorage.setItem(
                        import.meta.env.VITE_AUTH_KEY,
                        user.id
                    );
                }
                setUser?.(user);
            });

const loginUser = (setUser: SetUser) => (email: string, password: string) =>
    fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    })
        .then(async (response) =>
            response.ok
                ? response.json()
                : Promise.reject({
                      status: response.status,
                      body: await response.json(),
                  })
        )
        .then((user) => {
            if (user) {
                sessionStorage.setItem("secret-CXVSDFGS", user.id);
                // import.meta.env.VITE_AUTH_KEY
            }
            setUser?.(user);
        });

const logout = (setUser: SetUser) => () => {
    sessionStorage.removeItem("secret-CXVSDFGS");
    // sessionStorage.removeItem(import.meta.env.VITE_AUTH_KEY);
    setUser?.(null);
};

const tryToFetchUser = (setUser: SetUser) =>
    fetch("/api/check-user", {
        method: "POST",
        body: JSON.stringify({
            userId: sessionStorage.getItem("secret-CXVSDFGS"),
            // userId: sessionStorage.getItem(import.meta.env.VITE_AUTH_KEY),
        }),
    })
        .then((response) => (response.ok ? response.json() : null))
        .then(setUser);

export const useUser = () => {
    const [user, setUser] = useContext(UserContext);

    useEffect(() => void tryToFetchUser(setUser), []);

    return [
        user,
        {
            login: loginUser(setUser),
            logout: logout(setUser),
            register: registerUser(setUser),
        },
    ];
};
