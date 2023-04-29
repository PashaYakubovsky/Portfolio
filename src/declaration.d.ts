import * as THREE from "three";
declare module "*.json" {
    const value: any;
    export default value;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            gradientTexture: {
                attach?: string;
                args: [colors: THREE.ColorRepresentation[]];
                wrapS?: THREE.Wrapping;
                wrapT?: THREE.Wrapping;
            };
        }
    }
}
