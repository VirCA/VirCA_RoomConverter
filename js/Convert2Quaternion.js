module.exports = function (orientation){
    var newOri = {
        quaternion:{
            x: undefined,
            y: undefined,
            z: undefined,
            w: undefined
        }
    }
    console.log("Itt vagyok.");
    if(orientation.ypr.yaw != ""){
        newOri.quaternion.x = Math.round((Math.sin((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2) - Math.cos((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2))*1000)/1000;
        newOri.quaternion.y = Math.round((Math.cos((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2) + Math.sin((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2))*1000)/1000;
        newOri.quaternion.z = Math.round((Math.cos((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2) - Math.sin((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2))*1000)/1000;
        newOri.quaternion.w = Math.round((Math.cos((orientation.ypr.roll)/2)*Math.cos((orientation.ypr.pitch)/2)*Math.cos((orientation.ypr.yaw)/2) + Math.sin((orientation.ypr.roll)/2)*Math.sin((orientation.ypr.pitch)/2)*Math.sin((orientation.ypr.yaw)/2))*1000)/1000;
    }
    else if(orientation.angleAxis.angle != ""){
        newOri.quaternion.w = Math.round(Math.cos(orientation.angleAxis.angle/2)*1000)/1000;
        newOri.quaternion.x = Math.round(orientation.angleAxis.axis.x * Math.sin(orientation.angleAxis.angle/2)*1000)/1000;
        newOri.quaternion.y = Math.round(orientation.angleAxis.axis.y * Math.sin(orientation.angleAxis.angle/2)*1000)/1000;
        newOri.quaternion.z = Math.round(orientation.angleAxis.axis.z * Math.sin(orientation.angleAxis.angle/2)*1000)/1000;

    }
    else if(orientation.rotMatrix.xx != ""){
        newOri.quaternion.w = Math.round((Math.sqrt(1+orientation.rotMatrix.xx + orientation.rotMatrix.yy + orientation.rotMatrix.zz)/2)*1000)/1000;
        var tmp = newOri.quaternion.w * 4;
        newOri.quaternion.x = Math.round(((orientation.rotMatrix.zy - orientation.rotMatrix.yz) / tmp)*1000)/1000;
        newOri.quaternion.y = Math.round(((orientation.rotMatrix.xz - orientation.rotMatrix.zx) / tmp)*1000)/1000;
        newOri.quaternion.z = Math.round(((orientation.rotMatrix.yx - orientation.rotMatrix.xy) / tmp)*1000)/1000;
    }
    console.log(newOri);
    return newOri;
}