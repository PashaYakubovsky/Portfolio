# Portfolio

<!-- animation concept -->
<!-- #[IMAGE 2023-04-25 20:43:45](https://user-images.githubusercontent.com/74597949/234358954-0b5ae9e0-4e8e-438d-9775-7a339810c6e7.jpg) -->

## Pages

-   [/] home page
-   [/chat] chat based on socket.io

## Table of Contents

-   [About](#about)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## About

This is an awesome project built with React, Three.js, React-Three-Fiber, React-Spring, and TypeScript. It showcases the power of these libraries and provides a stunning user experience.

if you want to change dynamic 3d text on main page, make request to this API. Its make request into node.js express.js server and take u message and pass into websocket connection to client

With JavaScript

```js
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IjQ1NTU1NTUiLCJhdmF0YXJVcmwiOiIiLCJuYW1lIjoiWFhYWFgiLCJ1c2VySWQiOiJhc2RzYWRhc2Rhc2Rhc2RzYWRhc2Rhc2QiLCJjcmVhdGVEYXRlIjoiMjAyMy0wNC0zMFQxMzoxMToxMS4xMDlaIiwiaWF0IjoxNjg1NjY2OTMxLCJleHAiOjE2ODU3NTMzMzF9.03UGRTZANn_5z9MYTjfu5bP1a05OrbKZjz4_2z4j4vg"
);

var raw = JSON.stringify({
    message: "try with yours text",
});

var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
};

fetch("https://pashaykubovsky.tech:25055/api/v1/change-3d-text", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
```

## Technologies Used

-   [React](https://reactjs.org/)
-   [Three.js](https://threejs.org/)
-   [React-Three-Fiber](https://github.com/pmndrs/react-three-fiber)
-   [React-Spring](https://www.react-spring.io/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [React Router](https://reactrouter.com/en/main)
-   [Nx](https://nx.dev/)
-   [Vite](https://vitejs.dev/)
-   [Socket.io](https://socket.io)

## Installation

To install and run this project, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the root directory of the project.
3. Run `npm run install` to install all dependencies.
4. Run `npm run start` to start the development server.
5. Open your browser and navigate to `http://localhost:4200`.

## Usage

This project provides an awesome user experience by displaying 3D graphics and animations using Three.js and React-Three-Fiber. React-Spring is used to provide smooth transitions and animations.
Also list of my job cases.
App have chat page with realtime chatting based on socket.io websocket.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please open an issue or pull request.

## License

This project is licensed under the [MIT License](LICENSE).
