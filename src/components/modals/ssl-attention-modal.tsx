import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import style from "./not-support.module.scss";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";

const SslAttentionModal = () => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [show, changeShow] = React.useState(true);
    const [cookie, setCookie] = useCookies(["agrees"]);

    return show && !cookie.agrees?.ssl ? (
        <Box className={style.supportContainer} ref={rootRef}>
            <Modal
                disableEnforceFocus
                disableAutoFocus
                open
                className={style.supportModal}
                container={() => rootRef.current}
            >
                <Box
                    sx={{
                        boxShadow: (theme) => theme.shadows[5],
                        p: 5,
                        pb: 2,
                        bgcolor: "background.paper",
                    }}
                    className={style.supportInnerContainer}
                >
                    <Typography
                        id="server-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ flexGrow: 1 }}
                    >
                        This site use self signed ssl in node.js backend
                    </Typography>

                    <Button
                        onClick={() => {
                            changeShow(false);
                            setCookie("agrees", {
                                ...(cookie.agrees ?? {}),
                                ssl: true,
                            });
                        }}
                    >
                        Ok
                    </Button>
                </Box>
            </Modal>
        </Box>
    ) : null;
};

export default SslAttentionModal;
