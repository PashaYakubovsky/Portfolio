import { ReactElement, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import AuthModal from "src/components/modals/auth-modal";
import { useConfigStore } from "src/store/store";
import { devHelperApi } from "../../config.json";

const RequireAuth = ({
    children,
}: {
    children: ReactElement[] | ReactElement;
}) => {
    const user = useConfigStore((state) => state.user);
    const changeUser = useConfigStore((state) => state.changeUser);
    const navigate = useNavigate();
    const [openModal, changeOpenModal] = useState(false);
    const [cookie] = useCookies(["token_dev"]);

    useEffect(() => {
        if (!cookie?.token_dev) {
            changeOpenModal(true);
        } else if (!user.name) {
            const getUser = async () => {
                try {
                    const payloadEncoded = cookie.token_dev.split(".")[1];
                    const { userId } = JSON.parse(atob(payloadEncoded));
                    const endpoint = devHelperApi + "/api/v1/user/" + userId;

                    const response = await fetch(endpoint, {
                        headers: {
                            Authorization: "Bearer " + cookie.token_dev,
                        },
                    });
                    const _user = await response.json();

                    changeUser({ ...user, ..._user, password: null });
                } catch (err) {
                    console.log(err);
                }
            };
            getUser();
        }
    }, [changeUser, cookie.token_dev, navigate, user, user.name]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return (
        <>
            {openModal ? (
                <AuthModal open={openModal} handleClose={changeOpenModal} />
            ) : null}
            {children}
        </>
    );
};

export default RequireAuth;
