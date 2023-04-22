import { Canvas, useFrame } from "@react-three/fiber";
import style from "./home.module.scss";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ScrollToTopButton from "../scroll-to-buttons/scroll-to-top";
import ImgMediaCard from "./card";
import ScrollToBottomButton from "../scroll-to-buttons/scroll-to-bottom";
import { useState } from "react";
import {
    OrbitControls,
    TransformControls,
    useCursor,
    Stars,
} from "@react-three/drei";
import { useControls } from "leva";
import { create } from "zustand";
import { Object3D } from "three";

interface TargetState {
    target: null | Object3D<Event>;
    setTarget: (by: null | Object3D) => void;
}

const useTargetState = create<TargetState>()((set) => ({
    target: null,
    setTarget: (target) => set({ target }),
}));

export interface JobExperience {
    name: string;
    screenshots: string[];
    description: string;
    link?: string;
}

const cards: JobExperience[] = [
    {
        description: `ASP.NET 7 додаток який робить запит на OpenAI API
                    Реалізована авторизація та реєстрація черз Jwt токен, створення видалення юзерів, також існують ролі Admin та User
                    При створені юзера він привязується до порталу з яким цей сервіс буде працювати
                    Робота с chat-gpt, DALL-E
                    Логування в текстовий файл через NLog
                    Логування всіх запитів в табличку sql
                    Робота з сутностями через code first EntityFramework`,
        name: "Gpt Service",
        screenshots: [],
        link: "https://mhp.inboost.ai:25056/swagger/index.html",
    },
    {
        name: "Dev Helper Assistance",
        description: `
                    Express.js сервер який хостить діскорд бота, проект написаний на TypeScript та піднімається за допомоги nodemon
                    Також в середині реалізована система Молодший брат, це просто роут який формує карточку для діскорда та відправляє на визначиний сервер на вебхук помилки, написаний для контролю помилок для всіх порталів фронт-енд додатків`,
        screenshots: [],
        link: "https://discord.gg/8WCEeGEb",
    },
    {
        name: "Datepicker",
        description: `React, Redux, TypeScript біблеотека для дейтпікера існють такі фічі (3dMode для ефектного відображення, автовизначення к-сть інстансів в залежності від ширини контейнера, кожен інстанс працює зі своїм стейтом типу визначення неділі, місяця, сінгл дейт або ренж)`,
        screenshots: [],
        link: "https://640d185181f1e1bf735745d6-vinqyxblem.chromatic.com/?path=/story/datepicker--primary",
    },
];

const theme = createTheme();

export default function HomeV2() {
    const { target, setTarget } = useTargetState();
    const { mode } = useControls({
        mode: { value: "translate", options: ["translate", "rotate", "scale"] },
    });
    const [showCanvas, changeShowCanvas] = React.useState(true);
    const observer = React.useRef<IntersectionObserver | null>(null);
    // This reference will give us direct access to the mesh
    const interceptor = React.useCallback((node: HTMLDivElement | null) => {
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entries) => {
            const isIntersecting = entries[0].isIntersecting;
            if (!isIntersecting) {
                changeShowCanvas(false);
            } else {
                changeShowCanvas(true);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

    return (
        <div>
            <div className={style.home}>
                {showCanvas ? (
                    <Canvas
                        dpr={[1, 2]}
                        onPointerMissed={() => setTarget(null)}
                        frameloop="demand"
                        camera={{ position: [1.0, 1.0, 1.0] }}
                    >
                        <color attach="background" args={["black"]} />
                        <Stars saturation={0} count={300} speed={1} />
                        <Box3D position={[2, 2, 0]} direction />
                        <Box3D />

                        {target && (
                            <TransformControls object={target} mode={mode} />
                        )}
                        <OrbitControls makeDefault />
                    </Canvas>
                ) : null}
            </div>

            <ScrollToBottomButton />
            <ScrollToTopButton />

            <ThemeProvider theme={theme}>
                <main ref={interceptor}>
                    <Container sx={{ py: 8, mt: "100vh" }} maxWidth="md">
                        {/* End hero unit */}
                        <Grid
                            container
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "2vw",
                            }}
                            spacing={2}
                        >
                            {cards.map((card) => (
                                <ImgMediaCard {...card} />
                            ))}
                        </Grid>
                    </Container>
                </main>

                <Box
                    style={{
                        width: "100%",
                        height: "auto",
                        backgroundColor: "white",
                        paddingTop: "1rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <Container maxWidth="lg" fixed>
                        <Grid container direction="column" alignItems="center">
                            <Copyright />
                            <Grid item xs={12}>
                                <Typography
                                    textAlign="center"
                                    color="textSecondary"
                                    variant="subtitle1"
                                >
                                    React | Material UI
                                    <br />
                                    TypeScript | React Three Fiber | React
                                    Spring
                                </Typography>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </ThemeProvider>
        </div>
    );
}

function Box3D(props: Record<string, unknown>) {
    const myMesh = React.useRef<any>();
    const setTarget = useTargetState((state) => state.setTarget);
    const [hovered, setHovered] = useState(false);

    useCursor(hovered);

    useFrame(({ clock }) => {
        if (myMesh.current) {
            if (props?.direction) {
                Math.round(
                    (myMesh.current.rotation.x = clock.getElapsedTime() / 4)
                );
            }
        }
    });
    return (
        <mesh
            {...props}
            ref={myMesh}
            onClick={(e) => setTarget(e.object)}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry />
            {/* <meshNormalMaterial /> */}
            <meshBasicMaterial color={0xfff1ef} attach="material" clipShadows  />
        </mesh>
    );
}

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/PashaYakubovsky">
                My Github
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}
