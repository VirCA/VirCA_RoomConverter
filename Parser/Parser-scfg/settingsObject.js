module.exports = {
    environment: {
        skybox: {
            materialName: undefined,
            distance: undefined
        },
        ambientColor: {
            r: undefined,
            g: undefined,
            b: undefined,
            a: undefined
        },
        backgroundColor: {
            r: "0",
            g: "0",
            b: "0",
            a: "1"
        },
        shader: undefined,
        compositors: {
            Bloom: undefined,
            MotionBlur: undefined
        },
        fog: {
            type: undefined,
            color: {
                r: undefined,
                g: undefined,
                b: undefined,
                a: undefined
            },
            linearStart: undefined,
            linearStop: undefined,
            expDensity: undefined
        }
    },
    pointer:{
        visibility: undefined,
        crosshairs: undefined,
        length: undefined,
        offset: {
            x: undefined,
            y: undefined,
            z: undefined
        }
    },
    boundaries: {
        xlimit: {
            min: undefined,
            max: undefined
        },
        ylimit: {
            min: undefined,
            max: undefined
        },
        zlimit: {
            min: undefined,
            max: undefined
        }
    },
    camera: {
        pose: {
            position: {
                x: undefined,
                y: undefined,
                z: undefined
            },
            orientation:{
                ypr: {
                    yaw: undefined,
                    pitch: undefined,
                    roll: undefined
                },
                angleAxis: {
                    angle: undefined,
                    axis:{
                        x: undefined,
                        y: undefined,
                        z: undefined	
                    },
                },
                quaternion:{
                    x: undefined,
                    y: undefined,
                    z: undefined,
                    w: undefined
                },
                rotMatrix: {
                    xx: undefined,
                    xy: undefined,
                    xz: undefined,
                    yx: undefined,
                    yy: undefined,
                    yz: undefined,
                    zx: undefined,
                    zy: undefined,
                    zz: undefined
                }

            },
        },
        clipping: {
            near: undefined,
            far: undefined
        },
        fov: undefined
    },
    browserStartPage: {
        url: undefined
    },
    presentation: {
        fileName: undefined,
        enabled: undefined
    }
};