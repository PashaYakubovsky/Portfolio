import { ReactElement, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import AuthModal from "src/components/modals/auth-modal";

const RequireAuth = ({
    children,
}: {
    children: ReactElement[] | ReactElement;
}) => {
    const navigate = useNavigate();
    const [openModal, changeOpenModal] = useState(false);
    const [cookie] = useCookies(["token_dev"]);

    useEffect(() => {
        if (!cookie?.token_dev) {
            changeOpenModal(true);
        }
    }, [cookie?.token_dev, navigate]);

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
