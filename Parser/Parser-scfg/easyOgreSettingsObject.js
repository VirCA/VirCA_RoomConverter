module.exports = {
    environment: {
        ambientColor: {
            r: "0.3",
            g: "0.3",
            b: "0.3",
            a: "1"
        },
        backgroundColor: {
            r: "0",
            g: "0",
            b: "0",
            a: "1"
        },
        runtimeshadersystem: "false",
        shadow: "NONE",
        compositors: {
            Bloom: "false",
            MotionBlur: "false"
        },
        fog: {
            type: "NONE",
            color: {
                r: "1.0",
                g: "1.0",
                b: "1.0",
                a: "0.0"
            },
            linearStart: "600",
            linearStop: "2000",
            expDensity: "0.0015"
        }
    },
    pointer: {
        visibility: "false",
        crosshairs: "true",
        length: "180",
        offset: {
            x: "0",
            y: "-20",
            z: "-75"
        }
    },
    boundaries: {
        xlimit: {
            min: "-1000",
            max: "1000"
        },
        ylimit: {
            min: "0",
            max: "1000"
        },
        zlimit: {
            min: "-1000",
            max: "1000"
        }
    },
    camera: {
        pose: {
            position: {
                x: "0",
                y: "150",
                z: "0"
            },
            orientation: {
               quaternion: {
                    x: "0",
                    y: "0",
                    z: "0",
                    w: "1"
               }
            },
        },
        clipping: {
            near: "1",
            far: "10000"
        },
        fov: "45"
    },
    browserStartPage: {
        url: "http://virca.hu/start"
    }
};