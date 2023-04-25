import * as React from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ConfigContext } from "src/contexts/config-context";
import style from "./not-support.module.scss";
import { Button } from "@mui/material";

const NotSupportModal = () => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [show, changeShow] = React.useState(true);
    const { supportWebGl } = React.useContext(ConfigContext);

    return !supportWebGl && show ? (
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
                        Lockdown mode is enabled in your browser. This may
                        affect the functionality of certain features on this
                        site.
                    </Typography>

                    <Button
                        onClick={() => {
                            changeShow(false);
                        }}
                    >
                        Ok
                    </Button>
                </Box>
            </Modal>
        </Box>
    ) : null;
};

export default NotSupportModal;
