import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useState } from "react";
import config from "../../../config.json";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_PAGE, SIGN_UP_PAGE } from "src/app/routes";

const AuthModal = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose?: (arg: boolean) => void;
}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [, setCookie] = useCookies(["token_dev"]);
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const queryObject = Object.fromEntries(params.entries());

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(
                config?.devHelperApi + "/api/v1/auth/login",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name,
                        password,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const token = await response.text();

            if (token) {
                setCookie("token_dev", token);
            }
            if (window.location.pathname === LOGIN_PAGE)
                navigate(queryObject?.redirect_rout ?? "/");
        } catch (err) {
            console.log(err);
        }

        handleClose?.(false);
    };

    return (
        <Dialog
            open={open}
            onKeyDown={(e) => e.code === "Enter" && handleSubmit()}
            onClose={() => {
                handleClose?.(true);
            }}
        >
            <DialogContent sx={{ width: "60vw", maxWidth: "500px" }}>
                <DialogTitle>Sign In</DialogTitle>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        margin: 0,
                        marginBottom: 20,
                    }}
                >
                    <TextField
                        required
                        label="Name"
                        variant="outlined"
                        type="name"
                        value={name}
                        onChange={handleNameChange}
                    />

                    <TextField
                        required
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div
                    style={{
                        margin: "25px 0 0 0",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: "black",
                            color: "whitesmoke",
                            width: "100%",
                            pt: 1,
                            pb: 1,
                            "&:hover": {
                                backgroundColor: "whitesmoke",
                                color: "black",
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    {window.location.pathname !== "/login" ? (
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                width: "100%",
                                pt: 1,
                                pb: 1,
                            }}
                            onClick={() => {
                                handleClose?.(false);
                            }}
                        >
                            Close
                        </Button>
                    ) : null}
                </div>
                <Button
                    onClick={() => {
                        navigate(
                            SIGN_UP_PAGE + `?redirect_rout=${location.pathname}`
                        );
                    }}
                    sx={{
                        width: "100%",
                        mt: 1,
                        backgroundColor: "black",
                        color: "whitesmoke",
                        pt: 1,
                        pb: 1,
                        "&:hover": {
                            backgroundColor: "whitesmoke",
                            color: "black",
                        },
                    }}
                    variant="contained"
                >
                    Registration
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
