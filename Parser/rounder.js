module.exports = function (settings, content, nodeTypes) {
    //environment
    if (settings.environment.skybox != undefined && settings.environment.skybox.distance != "") {
        settings.environment.skybox.distance = rounding3(settings.environment.skybox.distance);
    }
    if (settings.environment.ambientColor != undefined && settings.environment.ambientColor.r  != "" && settings.environment.ambientColor.g != "" && settings.environment.ambientColor.b  != "" && settings.environment.ambientColor.a != "") {
        settings.environment.ambientColor.r = rounding5(settings.environment.ambientColor.r);
        settings.environment.ambientColor.g = rounding5(settings.environment.ambientColor.g);
        settings.environment.ambientColor.b = rounding5(settings.environment.ambientColor.b);
        settings.environment.ambientColor.a = rounding5(settings.environment.ambientColor.a);
    }
    if (settings.environment.backgroundColor != undefined) {
        settings.environment.backgroundColor.r = rounding5(settings.environment.backgroundColor.r);
        settings.environment.backgroundColor.g = rounding5(settings.environment.backgroundColor.g);
        settings.environment.backgroundColor.b = rounding5(settings.environment.backgroundColor.b);
        settings.environment.backgroundColor.a = rounding5(settings.environment.backgroundColor.a);
    }
    if (settings.environment.fog != undefined) {
        settings.environment.fog.color.r = rounding5(settings.environment.fog.color.r);
        settings.environment.fog.color.g = rounding5(settings.environment.fog.color.g);
        settings.environment.fog.color.b = rounding5(settings.environment.fog.color.b);
        settings.environment.fog.color.a = rounding5(settings.environment.fog.color.a);

        settings.environment.fog.linearStart = rounding3(settings.environment.fog.linearStart);
        settings.environment.fog.linearStop = rounding3(settings.environment.fog.linearStop);
        settings.environment.fog.expDensity = rounding3(settings.environment.fog.expDensity);
    }
    //pointer
    if (settings.pointer.length != undefined) {
        settings.pointer.length = rounding3(settings.pointer.length);
    }
    if (settings.pointer.offset != undefined) {
        settings.pointer.offset.x = rounding3(settings.pointer.offset.x);
        settings.pointer.offset.y = rounding3(settings.pointer.offset.y);
        settings.pointer.offset.z = rounding3(settings.pointer.offset.z);
    }
    //boundaries
    if (settings.boundaries != undefined) {
        settings.boundaries.xlimit.min = rounding3(settings.boundaries.xlimit.min);
        settings.boundaries.xlimit.max = rounding3(settings.boundaries.xlimit.max);
        settings.boundaries.ylimit.min = rounding3(settings.boundaries.ylimit.min);
        settings.boundaries.ylimit.max = rounding3(settings.boundaries.ylimit.max);
        settings.boundaries.zlimit.min = rounding3(settings.boundaries.zlimit.min);
        settings.boundaries.zlimit.max = rounding3(settings.boundaries.zlimit.max);
    }
    //camera
    if (settings.camera != undefined) {
        settings.camera.pose.position.x = rounding3(settings.camera.pose.position.x);
        settings.camera.pose.position.y = rounding3(settings.camera.pose.position.y);
        settings.camera.pose.position.z = rounding3(settings.camera.pose.position.z);

        settings.camera.pose.orientation.quaternion.x = rounding3(settings.camera.pose.orientation.quaternion.x);
        settings.camera.pose.orientation.quaternion.y = rounding3(settings.camera.pose.orientation.quaternion.y);
        settings.camera.pose.orientation.quaternion.z = rounding3(settings.camera.pose.orientation.quaternion.z);
        settings.camera.pose.orientation.quaternion.w = rounding3(settings.camera.pose.orientation.quaternion.w);

        settings.camera.clipping.near = rounding3(settings.camera.clipping.near);
        settings.camera.clipping.far = rounding3(settings.camera.clipping.far);
        settings.camera.fov = rounding3(settings.camera.fov);
    }
    

    //console.log(JSON.stringify(content).replace(/[0-9]+[.][0-9]+/gim, rounding3(/[0-9]+[.][0-9]+/gim)));

    var arr = JSON.stringify(content).match(/[0-9]+[.][0-9][0-9][0-9]+/gim);

    tmp = JSON.stringify(content);
    if(arr != undefined){
        for (var i = 0; i < arr.length; ++i) {
            tmp = tmp.replace(arr[i], rounding3(arr[i]));
        }
        content = JSON.parse(tmp);
    }

    var room = {};
    room.settings = settings;
    room.content = content;
    return room;
}
function rounding3(str) {
    if(str != undefined)
        return (Math.round(parseFloat(str.toString()) * 1000) / 1000).toString();
    return;
}
function rounding5(str) {
    if(str != undefined)
        return (Math.round(parseFloat(str.toString()) * 100000) / 100000).toString();
    return;
}   