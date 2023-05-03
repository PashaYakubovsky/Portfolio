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

const AuthModal = ({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: (arg: boolean) => void;
}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [, setCookie] = useCookies(["token_dev"]);

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
        } catch (err) {
            console.log(err);
        }

        handleClose(false);
    };

    return (
        <Dialog
            open={open}
            onKeyDown={(e) => e.code === "Enter" && handleSubmit()}
            onClose={() => {
                handleClose(true);
            }}
        >
            <DialogContent>
                <DialogTitle>Sign In</DialogTitle>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
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
                        margin: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => {
                            handleClose(false);
                        }}
                    >
                        Close
                    </Button>
                </div>
                <Button
                    sx={{ width: "100%", mt: 1 }}
                    variant="contained"
                    color="primary"
                >
                    Registration
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
