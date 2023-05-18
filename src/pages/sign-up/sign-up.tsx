import * as React from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
// import AuthModal from "src/components/modals/auth-modal.js";
import config from "../../../config.json";
import { useConfigStore } from "src/store/store";
import { useCookies } from "react-cookie";
// import FormHelperText from "@mui/material/FormHelperText";
import { useLocation, useNavigate } from "react-router-dom";
// import { useMediaQuery } from "@mui/material";

// import style from "./sign-in.module.scss";

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const queryObject = Object.fromEntries(params.entries());
    const [cookie, changeCookie] = useCookies(["token_dev"]);
    const user = useConfigStore((state) => state.user);
    const [errors, changeErrors] = useState({
        password: {
            err: false,
            subErr: false,
            text: "",
            subText: "",
        },
        email: {
            err: false,
            text: "",
        },
    });
    const changeUser = useConfigStore((state) => state.changeUser);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const body = {
                name: data.get("firstName")?.toString(),
                email: data.get("email")?.toString(),
                password: data.get("password"),
                password1: data.get("password1"),
                userId: user?.userId,
                token: "SUPER_SECRET_220",
            };

            if (body.password !== body.password1) {
                changeErrors({
                    ...errors,
                    password: {
                        ...errors.password,
                        subErr: true,
                        subText: "Passwords must be the same",
                    },
                });
                return;
            }

            const response = await fetch(
                config?.devHelperApi + "/api/v1/user/create",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: {
                        Authorization: `Bearer ${cookie?.token_dev}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                try {
                    const responseToken = await fetch(
                        config?.devHelperApi + "/api/v1/auth/login",
                        {
                            method: "POST",
                            body: JSON.stringify({
                                name: body.name,
                                password: body.password,
                            }),
                            headers: {
                                Authorization: `Bearer ${cookie?.token_dev}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const { token, user: _user } = await responseToken.json();

                    changeUser({
                        ...(user ?? {}),
                        ...(_user as User),
                        password: null,
                    });

                    changeCookie("token_dev", token);

                    navigate(queryObject?.redirect_rout ?? "/");
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const validatePassword = (value: string, isSub?: boolean) => {
        if (value.length < 8) {
            changeErrors((state) => {
                if (!state.password[isSub ? "subErr" : "err"]) {
                    return {
                        ...state,
                        password: {
                            ...state.password,
                            [isSub ? "subErr" : "err"]: true,
                            [isSub ? "subText" : "text"]:
                                "Password must be at least 8 characters",
                        },
                    };
                }
                return state;
            });
        } else {
            changeErrors((state) =>
                state.password[isSub ? "subErr" : "err"]
                    ? {
                          ...state,
                          password: {
                              ...state.password,
                              [isSub ? "subErr" : "err"]: false,
                              [isSub ? "subErr" : "err"]: "",
                          },
                      }
                    : state
            );
        }
        return true;
    };

    const changeErrorUniversal = (
        key: keyof typeof errors,
        err: { err: boolean; text: string }
    ) => {
        changeErrors((state) => ({
            ...state,
            [key]: err,
        }));
    };

    function validateEmail(email: string) {
        const re = /\S+@\S+\.\S+/;

        if (!email) {
            changeErrorUniversal("email", {
                err: true,
                text: "Please provide an email address",
            });
        } else if (!re.test(String(email).toLowerCase())) {
            changeErrorUniversal("email", {
                err: true,
                text: "Please enter a valid email address",
            });
        } else {
            changeErrorUniversal("email", {
                err: false,
                text: "",
            });
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{
                            mt: 3,
                            p: 5,
                            background: "white",
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    helperText={errors.email.text}
                                    error={errors.email.err}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        validateEmail(e.target.value)
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    helperText={errors.password.text}
                                    error={errors.password.err}
                                    fullWidth
                                    onChange={(e) => {
                                        validatePassword(e.target.value);
                                    }}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    helperText={errors.password.subText}
                                    error={errors.password.subErr}
                                    fullWidth
                                    onChange={(e) => {
                                        validatePassword(e.target.value, true);
                                    }}
                                    name="password1"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                pt: 1,
                                pb: 1,
                                color: "#fff",
                                backgroundColor: "#000",
                                ":hover": {
                                    backgroundColor: "#fff",
                                    color: "#000",
                                },
                            }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider>
    );
}
