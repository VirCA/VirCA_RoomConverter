var room = {};
var data = "";
var tree = {};
var xhr2 = new XMLHttpRequest();
function Settings2Run() {

    // $('#settings').addClass('hidden');
    //$('#jstree').addClass('hidden');
    xhr2.open('post', '/builder');
    xhr2.send('valasztVarok');
    xhr2.onloadend = function () {
        $('#plane').removeClass('hidden').addClass('shown');
        $('#jstree').removeClass('hidden').addClass('shown');
        console.log("A room tartalma: " + room);
        room = JSON.parse(xhr2.response);

        Initialing();
        ContentCreation();
        GetSettingsObject();
        tree = GetTree();
        $('#jstree').jstree(tree);

        $('#camera_ypr').removeClass('shown').addClass('hidden');
        $('#camera_angleAxis').removeClass('shown').addClass('hidden');
        $('#camera_rotMatrix').removeClass('shown').addClass('hidden');
    };

    var genRoomButton = document.getElementById("settings_submit");



    $('#jstree').on('changed.jstree', function (e, data) {
        console.log("Changed");

        switch (data.node.text) {
            case 'room': $('#RN').removeClass('hidden').addClass('shown');
                break;
            case 'Settings':
                $('#environment').removeClass("hidden").addClass("shown");
                $('#pointer').removeClass("hidden").addClass("shown");
                $('#boundaries').removeClass("hidden").addClass("shown");
                $('#camera').removeClass("hidden").addClass("shown");
                $('#browserStartPage').removeClass("hidden").addClass("shown");
                $('#presentation').removeClass("hidden").addClass("shown");
                break;
            case 'Environment': $('#environment').removeClass("hidden").addClass("shown");
                break;
            case 'Pointer': $('#pointer').removeClass("hidden").addClass("shown");
                break;
            case 'Boundaries': $('#boundaries').removeClass("hidden").addClass("shown");
                break;
            case 'Camera': $('#camera').removeClass("hidden").addClass("shown");
                break;
            case 'Browser Start Page': $('#browserStartPage').removeClass("hidden").addClass("shown");
                break;
            case 'Presentation': $('#presentation').removeClass("hidden").addClass("shown");
                break;
            case 'Content': $('#content').removeClass("hidden").addClass("shown");
                for (var i = 0; i < room.nodeTypes.length; i++) {
                    $('#content_node' + i).removeClass("hidden").addClass("shown");
                }
                break;

        }
        for (var i = 0; i < room.nodeTypes.length; i++) {
            if (data.node.text == room.content.node[i]['@'].name) {
                var tmp = '#content_node' + i;
                console.log()
                $('#content').removeClass("hidden").addClass("shown");
                $(tmp).removeClass("hidden").addClass("shown");
            }
        }
        $('#camera_orientation').change(function () {

            if ($('#camera_orientation').val() == 'q') {
                $('#camera_quaternion').removeClass('hidden').addClass('shown');
                $('#camera_angleAxis').removeClass('shown').addClass('hidden');
                $('#camera_ypr').removeClass('shown').addClass('hidden');
                $('#camera_rotMatrix').removeClass('shown').addClass('hidden');
            }
            else if ($('#camera_orientation').val() == 'rot') {
                $('#camera_quaternion').removeClass('shown').addClass('hidden');
                $('#camera_angleAxis').removeClass('shown').addClass('hidden');
                $('#camera_ypr').removeClass('shown').addClass('hidden');
                $('#camera_rotMatrix').removeClass('hidden').addClass('shown');
            }
            else if ($('#camera_orientation').val() == 'ypr') {
                $('#camera_quaternion').removeClass('shown').addClass('hidden');
                $('#camera_angleAxis').removeClass('shown').addClass('hidden');
                $('#camera_ypr').removeClass('hidden').addClass('shown');
                $('#camera_rotMatrix').removeClass('shown').addClass('hidden');
            }
            else if ($('#camera_orientation').val() == 'ang') {
                $('#camera_quaternion').removeClass('shown').addClass('hidden');
                $('#camera_angleAxis').removeClass('hidden').addClass('shown');
                $('#camera_ypr').removeClass('shown').addClass('hidden');
                $('#camera_rotMatrix').removeClass('shown').addClass('hidden');
            }

        });

        $('select').change(function () {
            for (var i = 0; i < room.nodeTypes.length; i++) {
                if ($('#content_node' + i + '_pose_orientation').val() == 'q') {
                    $('#node' + i + '_quaternion').removeClass('hidden').addClass('shown');
                    $('#node' + i + '_angleAxis').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_ypr').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_rotMatrix').removeClass('shown').addClass('hidden');
                }
                else if ($('#content_node' + i + '_pose_orientation').val() == 'rot') {
                    $('#node' + i + '_quaternion').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_angleAxis').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_ypr').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_rotMatrix').removeClass('hidden').addClass('shown');
                }
                else if ($('#content_node' + i + '_pose_orientation').val() == 'ypr') {
                    $('#node' + i + '_quaternion').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_angleAxis').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_ypr').removeClass('hidden').addClass('shown');
                    $('#node' + i + '_rotMatrix').removeClass('shown').addClass('hidden');
                }
                else if ($('#content_node' + i + '_pose_orientation').val() == 'ang') {
                    $('#node' + i + '_quaternion').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_angleAxis').removeClass('hidden').addClass('shown');
                    $('#node' + i + '_ypr').removeClass('shown').addClass('hidden');
                    $('#node' + i + '_rotMatrix').removeClass('shown').addClass('hidden');
                }
                if ($('#room_content_node' + i + '_light_type').val() == 's') {
                    $('#room_content_node' + i + '_light_type_spot').removeClass('hidden').addClass('shown');
                    $('#room_content_node' + i + '_light_type_point').removeClass('shown').addClass('hidden');
                    $('#room_content_node' + i + '_light_type_directional').removeClass('shown').addClass('hidden');
                }
                else if ($('#room_content_node' + i + '_light_type').val() == 'p') {
                    $('#room_content_node' + i + '_light_type_spot').removeClass('shown').addClass('hidden');
                    $('#room_content_node' + i + '_light_type_point').removeClass('hidden').addClass('shown');
                    $('#room_content_node' + i + '_light_type_directional').removeClass('shown').addClass('hidden');
                }
                else if ($('#room_content_node' + i + '_light_type').val() == 'd') {
                    $('#room_content_node' + i + '_light_type_spot').removeClass('shown').addClass('hidden');
                    $('#room_content_node' + i + '_light_type_point').removeClass('shown').addClass('hidden');
                    $('#room_content_node' + i + '_light_type_directional').removeClass('hidden').addClass('shown');
                }

            }
        });

    });
    genRoomButton.onclick = function () {
        GetSettingsObject();
        GetContentObject();
        xhr2 = new XMLHttpRequest();
        var formdata = new FormData();
        formdata.append('room', JSON.stringify(room));
        xhr2.open('post', '/roomgenerator');
        xhr2.send(formdata);
        xhr2.onloadend = function () {
            data = xhr2.responseText;

            document.getElementById('settings_site').innerHTML = "Thank you for using VirCA Room Converter!";
            download(room.roomName + ".room", data);
        };

    };
    $('#jstree').on('select_node.jstree', function (e, data) {
        console.log("Selected");
        HideAll();

    });

};

function Initialing() {
    //----------------roomName-------------------
    $('#roomName').val(room.roomName);
    //-----------------environment----------------
    if (room.settings.environment.skybox != undefined) {
        $('#environment_skybox_materialName').val(room.settings.environment.skybox.materialName);
        $('#environment_skybox_distance').val(room.settings.environment.skybox.distance);
    }
    $('#environment_ambientColor_r').val(room.settings.environment.ambientColor.r);
    $('#environment_ambientColor_g').val(room.settings.environment.ambientColor.g);
    $('#environment_ambientColor_b').val(room.settings.environment.ambientColor.b);
    $('#environment_ambientColor_a').val(room.settings.environment.ambientColor.a);
    $('#environment_backgroundColor_r').val(room.settings.environment.backgroundColor.r);
    $('#environment_backgroundColor_g').val(room.settings.environment.backgroundColor.g);
    $('#environment_backgroundColor_b').val(room.settings.environment.backgroundColor.b);
    $('#environment_backgroundColor_a').val(room.settings.environment.backgroundColor.a);
    $('#environment_runtimeShaderSystem').val(room.settings.environment.runtimeshadersystem);
    $('#environment_shadow').val(room.settings.environment.shadow);
    $('#environment_compositors_bloom').val(room.settings.environment.compositors.Bloom);
    $('#environment_compositors_motionBlur').val(room.settings.environment.compositors.MotionBlur);
    $('#environment_fog_type').val(room.settings.environment.fog.type);
    $('#environment_fog_color_r').val(room.settings.environment.fog.color.r);
    $('#environment_fog_color_g').val(room.settings.environment.fog.color.g);
    $('#environment_fog_color_b').val(room.settings.environment.fog.color.b);
    $('#environment_fog_color_a').val(room.settings.environment.fog.color.a);
    $('#environment_fog_linearStart').val(room.settings.environment.fog.linearStart);
    $('#environment_fog_linearStop').val(room.settings.environment.fog.linearStop);
    $('#environment_fog_expDensity').val(room.settings.environment.fog.expDensity);
    //-----------------pointer----------------
    $('#pointer_visibility').val(room.settings.pointer.visibility);
    $('#pointer_crosshairs').val(room.settings.pointer.crosshairs);
    $('#pointer_length').val(room.settings.pointer.length);
    if (room.settings.pointer.offset != undefined) {
        $('#camera_pointer_offset_x').val(room.settings.pointer.offset.x);
        $('#camera_pointer_offset_y').val(room.settings.pointer.offset.y);
        $('#camera_pointer_offset_z').val(room.settings.pointer.offset.z);
    }
    //-----------------boundaries----------------
    $('#boundaries_xLimit_min').val(room.settings.boundaries.xlimit.min);
    $('#boundaries_xLimit_max').val(room.settings.boundaries.xlimit.max);
    $('#boundaries_yLimit_min').val(room.settings.boundaries.ylimit.min);
    $('#boundaries_yLimit_max').val(room.settings.boundaries.ylimit.max);
    $('#boundaries_zLimit_min').val(room.settings.boundaries.zlimit.min);
    $('#boundaries_zLimit_max').val(room.settings.boundaries.zlimit.max);
    //-----------------camera----------------
    $('#camera_pose_position_x').val(room.settings.camera.pose.position.x);
    $('#camera_pose_position_y').val(room.settings.camera.pose.position.y);
    $('#camera_pose_position_z').val(room.settings.camera.pose.position.z);
    $('#camera_pose_orientation_qx').val(room.settings.camera.pose.orientation.quaternion.x);
    $('#camera_pose_orientation_qy').val(room.settings.camera.pose.orientation.quaternion.y);
    $('#camera_pose_orientation_qz').val(room.settings.camera.pose.orientation.quaternion.z);
    $('#camera_pose_orientation_qw').val(room.settings.camera.pose.orientation.quaternion.w);
    $('#camera_clipping_near').val(room.settings.camera.clipping.near);
    $('#camera_clipping_far').val(room.settings.camera.clipping.far);
    $('#camera_fov').val(room.settings.camera.fov);
    //-----------------browserStartPage----------------
    $('#browserStartPage_url').val(room.settings.browserStartPage.url);
    //-----------------presentation----------------
    if (room.settings.presentation != undefined) {
        $('#presentation_fileName').val(room.settings.presentation.fileName);
        $('#presentation_enabled').val(room.settings.presentation.enabled);
    }



}
function HideAll() {
    $('#RN').removeClass("shown").addClass("hidden");
    $('#environment').removeClass("shown").addClass("hidden");
    $('#pointer').removeClass("shown").addClass("hidden");
    $('#boundaries').removeClass("shown").addClass("hidden");
    $('#camera').removeClass("shown").addClass("hidden");
    $('#browserStartPage').removeClass("shown").addClass("hidden");
    $('#presentation').removeClass("shown").addClass("hidden");
    $('#content').removeClass("shown").addClass("hidden");
    for (var i = 0; i < room.nodeTypes.length; i++) {
        $('#content_node' + i).removeClass("shown").addClass("hidden");

        $('#node' + i + '_quaternion').removeClass('shown').addClass('hidden');
        $('#node' + i + '_angleAxis').removeClass('shown').addClass('hidden');
        $('#node' + i + '_ypr').removeClass('shown').addClass('hidden');
        $('#node' + i + '_rotMatrix').removeClass('shown').addClass('hidden');

        $('#room_content_node' + i + '_light_type_spot').removeClass('shown').addClass('hidden');
        $('#room_content_node' + i + '_light_type_point').removeClass('shown').addClass('hidden');
        $('#room_content_node' + i + '_light_type_directional').removeClass('shown').addClass('hidden');
    }
}

function GetSettingsObject() {
    room.roomName = $('#roomName').val();
    //-----------------environment----------------
    if (room.settings.environment.skybox != undefined) {
        room.settings.environment.skybox.materialName = $('#environment_skybox_materialName').val();
        room.settings.environment.skybox.distance = $('#environment_skybox_distance').val();
    }
    else {
        room.settings.environment.skybox = {};
        room.settings.environment.skybox.materialName = $('#environment_skybox_materialName').val();
        room.settings.environment.skybox.distance = $('#environment_skybox_distance').val();
    }
    room.settings.environment.ambientColor.r = $('#environment_ambientColor_r').val();
    room.settings.environment.ambientColor.g = $('#environment_ambientColor_g').val();
    room.settings.environment.ambientColor.b = $('#environment_ambientColor_b').val();
    room.settings.environment.ambientColor.a = $('#environment_ambientColor_a').val();
    room.settings.environment.backgroundColor.r = $('#environment_backgroundColor_r').val();
    room.settings.environment.backgroundColor.g = $('#environment_backgroundColor_g').val();
    room.settings.environment.backgroundColor.b = $('#environment_backgroundColor_b').val();
    room.settings.environment.backgroundColor.a = $('#environment_backgroundColor_a').val();
    room.settings.environment.runtimeshadersystem = $('#environment_runtimeShaderSystem').val();
    room.settings.environment.shadow = $('#environment_shadow').val();
    room.settings.environment.compositors.Bloom = $('#environment_compositors_bloom').val();
    room.settings.environment.compositors.MotionBlur = $('#environment_compositors_motionBlur').val();
    room.settings.environment.fog.type = $('#environment_fog_type').val();
    room.settings.environment.fog.color.r = $('#environment_fog_color_r').val();
    room.settings.environment.fog.color.g = $('#environment_fog_color_g').val();
    room.settings.environment.fog.color.b = $('#environment_fog_color_b').val();
    room.settings.environment.fog.color.a = $('#environment_fog_color_a').val();
    room.settings.environment.fog.linearStart = $('#environment_fog_linearStart').val();
    room.settings.environment.fog.linearStop = $('#environment_fog_linearStop').val();
    room.settings.environment.fog.expDensity = $('#environment_fog_expDensity').val();
    //-----------------pointer----------------
    room.settings.pointer.visibility = $('#pointer_visibility').val();
    room.settings.pointer.crosshairs = $('#pointer_crosshairs').val();
    room.settings.pointer.length = $('#pointer_length').val();
    room.settings.pointer.offset.x = $('#camera_pointer_offset_x').val();
    room.settings.pointer.offset.y = $('#camera_pointer_offset_y').val();
    room.settings.pointer.offset.z = $('#camera_pointer_offset_z').val();
    //-----------------boundaries----------------
    room.settings.boundaries.xlimit.min = $('#boundaries_xLimit_min').val();
    room.settings.boundaries.xlimit.max = $('#boundaries_xLimit_max').val();
    room.settings.boundaries.ylimit.min = $('#boundaries_yLimit_min').val();
    room.settings.boundaries.ylimit.max = $('#boundaries_yLimit_max').val();
    room.settings.boundaries.zlimit.min = $('#boundaries_zLimit_min').val();
    room.settings.boundaries.zlimit.max = $('#boundaries_zLimit_max').val();
    //-----------------camera----------------
    room.settings.camera.pose.position.x = $('#camera_pose_position_x').val();
    room.settings.camera.pose.position.y = $('#camera_pose_position_y').val();
    room.settings.camera.pose.position.z = $('#camera_pose_position_z').val();
    room.settings.camera.pose.orientation.quaternion.x = $('#camera_pose_orientation_qx').val();
    room.settings.camera.pose.orientation.quaternion.y = $('#camera_pose_orientation_qy').val();
    room.settings.camera.pose.orientation.quaternion.z = $('#camera_pose_orientation_qz').val();
    room.settings.camera.pose.orientation.quaternion.w = $('#camera_pose_orientation_qw').val();
    room.settings.camera.clipping.far = $('#camera_clipping_near').val();
    room.settings.camera.clipping.far = $('#camera_clipping_far').val();
    room.settings.camera.fov = $('#camera_fov').val();
    //-----------------browserStartPage----------------
    room.settings.browserStartPage.url = $('#browserStartPage_url').val();
    //-----------------presentation----------------
    if (room.settings.presentation != undefined) {
        room.settings.presentation.fileName = $('#presentation_fileName').val();
        room.settings.presentation.enabled = $('#presentation_enabled').val();
    }
    else {
        room.settings.presentation = {};
        room.settings.presentation.fileName = $('#presentation_fileName').val();
        room.settings.presentation.enabled = $('#presentation_enabled').val();
    }
}
function GetContentObject() {
    for (var i = 0; i < room.nodeTypes.length; i++) {
        //---------pose_position-----
        room.content.node[i].pose.position.x = $('#content_node' + i + '_pose_position_x').val();
        room.content.node[i].pose.position.y = $('#content_node' + i + '_pose_position_y').val();
        room.content.node[i].pose.position.z = $('#content_node' + i + '_pose_position_z').val();
        //---------pose_orientation--------
        if ($('#node' + i + '_pose_orientation').val() == "q") {
            room.content.node[i].pose.orientation.quaternion.x = $('#node' + i + '_pose_orientation_qx').val();
            room.content.node[i].pose.orientation.quaternion.y = $('#node' + i + '_pose_orientation_qy').val();
            room.content.node[i].pose.orientation.quaternion.z = $('#node' + i + '_pose_orientation_qz').val();
            room.content.node[i].pose.orientation.quaternion.w = $('#node' + i + '_pose_orientation_qw').val();
        }
        else if ($('#node' + i + '_pose_orientation').val() == "ang") {
            room.content.node[i].pose.orientation.angleAxis.angle = $('#node' + i + '_pose_orientation_angle').val();
            room.content.node[i].pose.orientation.angleAxis.axis.x = $('#node' + i + '_pose_orientation_axis_x').val();
            room.content.node[i].pose.orientation.angleAxis.axis.y = $('#node' + i + '_pose_orientation_axis_y').val();
            room.content.node[i].pose.orientation.angleAxis.axis.z = $('#node' + i + '_pose_orientation_axis_z').val();
            room.content.node[i].pose.orientation.quaternion.x = undefined;
            room.content.node[i].pose.orientation.quaternion.y = undefined;
            room.content.node[i].pose.orientation.quaternion.z = undefined;
            room.content.node[i].pose.orientation.quaternion.w = undefined;
        }
        else if ($('#node' + i + '_pose_orientation').val() == "ypr") {
            room.content.node[i].pose.orientation.ypr.yaw = $('#node' + i + '_pose_orientation_yaw').val();
            room.content.node[i].pose.orientation.ypr.pitch = $('#node' + i + '_pose_orientation_pitch').val();
            room.content.node[i].pose.orientation.ypr.roll = $('#node' + i + '_pose_orientation_roll').val();
            room.content.node[i].pose.orientation.quaternion.x = undefined;
            room.content.node[i].pose.orientation.quaternion.y = undefined;
            room.content.node[i].pose.orientation.quaternion.z = undefined;
            room.content.node[i].pose.orientation.quaternion.w = undefined;
        }
        else if ($('#node' + i + '_pose_orientation').val() == "rot") {
            room.content.node[i].pose.orientation.rotMatrix.xx = $('#node' + i + '_pose_orientation_xx').val();
            room.content.node[i].pose.orientation.rotMatrix.xy = $('#node' + i + '_pose_orientation_xy').val();
            room.content.node[i].pose.orientation.rotMatrix.xz = $('#node' + i + '_pose_orientation_xz').val();
            room.content.node[i].pose.orientation.rotMatrix.yx = $('#node' + i + '_pose_orientation_yx').val();
            room.content.node[i].pose.orientation.rotMatrix.yy = $('#node' + i + '_pose_orientation_yy').val();
            room.content.node[i].pose.orientation.rotMatrix.yz = $('#node' + i + '_pose_orientation_yz').val();
            room.content.node[i].pose.orientation.rotMatrix.zx = $('#node' + i + '_pose_orientation_zx').val();
            room.content.node[i].pose.orientation.rotMatrix.zy = $('#node' + i + '_pose_orientation_zy').val();
            room.content.node[i].pose.orientation.rotMatrix.zz = $('#node' + i + '_pose_orientation_zz').val();
            room.content.node[i].pose.orientation.quaternion.x = undefined;
            room.content.node[i].pose.orientation.quaternion.y = undefined;
            room.content.node[i].pose.orientation.quaternion.z = undefined;
            room.content.node[i].pose.orientation.quaternion.w = undefined;
        }
        //--------------types-----------
        if (room.nodeTypes[i] == "node") {
            room.content.node[i].entity.meshFileName = $('#room_content_node' + i + '_entity_meshFileName').val();
            room.content.node[i].entity.castShadows = $('#room_content_node' + i + '_entity_castShadows').val();
            room.content.node[i].scale.x = $('#room_content_node' + i + '_scale_x').val();
            room.content.node[i].scale.y = $('#room_content_node' + i + '_scale_y').val();
            room.content.node[i].scale.z = $('#room_content_node' + i + '_scale_z').val();
        }
        else if (room.nodeTypes[i] == "browser") {
            room.content.node[i].browser.url = $('#room_content_node' + i + '_browser_url').val();
            room.content.node[i].browser.shared = $('#room_content_node' + i + '_browser_shared').val();
            room.content.node[i].browser.draggable = $('#room_content_node' + i + '_browser_draggable').val();
            room.content.node[i].browser.snappedToWall = $('#room_content_node' + i + '_browser_snappedToWall').val();
            room.content.node[i].browser.width = $('#room_content_node' + i + '_browser_width').val();
            room.content.node[i].browser.height = $('#room_content_node' + i + '_browser_height').val();
            room.content.node[i].browser.resH = $('#room_content_node' + i + '_browser_resH').val();
            room.content.node[i].browser.resV = $('#room_content_node' + i + '_browser_resV').val();
            room.content.node[i].browser.zoom = $('#room_content_node' + i + '_browser_zoom').val();
        }
        else if (room.nodeTypes[i] == "light") {
            room.content.node[i].light.diffuse.r = $('#room_content_node' + i + '_light_diffuse_r').val();
            room.content.node[i].light.diffuse.g = $('#room_content_node' + i + '_light_diffuse_g').val();
            room.content.node[i].light.diffuse.b = $('#room_content_node' + i + '_light_diffuse_b').val();
            room.content.node[i].light.diffuse.a = $('#room_content_node' + i + '_light_diffuse_a').val();
            room.content.node[i].light.specular.r = $('#room_content_node' + i + '_light_specular_r').val();
            room.content.node[i].light.specular.g = $('#room_content_node' + i + '_light_specular_g').val();
            room.content.node[i].light.specular.b = $('#room_content_node' + i + '_light_specular_b').val();
            room.content.node[i].light.specular.a = $('#room_content_node' + i + '_light_specular_a').val();
            room.content.node[i].light.offset.x = $('#room_content_node' + i + '_light_offset_x').val();
            room.content.node[i].light.offset.y = $('#room_content_node' + i + '_light_offset_y').val();
            room.content.node[i].light.offset.z = $('#room_content_node' + i + '_light_offset_z').val();
            if ($('#room_content_node' + i + '_light_type').val() == "p") {
                room.content.node[i].light.type.point.attenuation.range = $('#room_content_node' + i + '_light_type_point_attenuation_range').val();
                room.content.node[i].light.type.point.attenuation.manual.constant = $('#room_content_node' + i + '_light_type_point_attenuation_manual_constant').val();
                room.content.node[i].light.type.point.attenuation.manual.linear = $('#room_content_node' + i + '_light_type_point_attenuation_manual_linear').val();
                room.content.node[i].light.type.point.attenuation.manual.quadratic = $('#room_content_node' + i + '_light_type_point_attenuation_manual_quadratic').val();

                room.content.node[i].light.type.directional.direction.x = undefined;
                room.content.node[i].light.type.directional.direction.y = undefined;
                room.content.node[i].light.type.directional.direction.z = undefined;

                room.content.node[i].light.type.spot.attenuation.range = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.quadratic = undefined;
                room.content.node[i].light.type.spot.range.inner = undefined;
                room.content.node[i].light.type.spot.range.outer = undefined;
                room.content.node[i].light.type.spot.range.falloff = undefined;
                room.content.node[i].light.type.spot.direction.x = undefined;
                room.content.node[i].light.type.spot.direction.y = undefined;
                room.content.node[i].light.type.spot.direction.z = undefined;

            }
            else if ($('#room_content_node' + i + '_light_type').val() == "s") {
                room.content.node[i].light.type.spot.attenuation.range = $('#room_content_node' + i + '_light_type_spot_attenuation_range').val();
                room.content.node[i].light.type.spot.attenuation.manual.constant = $('#room_content_node' + i + '_light_type_spot_attenuation_manual_constant').val();
                room.content.node[i].light.type.spot.attenuation.manual.linear = $('#room_content_node' + i + '_light_type_spot_attenuation_manual_linear').val();
                room.content.node[i].light.type.spot.attenuation.manual.quadratic = $('#room_content_node' + i + '_light_type_spot_attenuation_manual_quadratic').val();
                room.content.node[i].light.type.spot.range.inner = $('#room_content_node' + i + '_light_type_spot_range_inner').val();
                room.content.node[i].light.type.spot.range.outer = $('#room_content_node' + i + '_light_type_spot_range_outer').val();
                room.content.node[i].light.type.spot.range.falloff = $('#room_content_node' + i + '_light_type_spot_range_falloff').val();
                room.content.node[i].light.type.spot.direction.x = $('#room_content_node' + i + '_light_type_spot_direction_x').val();
                room.content.node[i].light.type.spot.direction.y = $('#room_content_node' + i + '_light_type_spot_direction_y').val();
                room.content.node[i].light.type.spot.direction.z = $('#room_content_node' + i + '_light_type_spot_direction_z').val();

                room.content.node[i].light.type.point.attenuation.range = undefined;
                room.content.node[i].light.type.point.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.point.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.point.attenuation.manual.quadratic = undefined;

                room.content.node[i].light.type.directional.direction.x = undefined;
                room.content.node[i].light.type.directional.direction.y = undefined;
                room.content.node[i].light.type.directional.direction.z = undefined;
            }
            else if ($('#room_content_node' + i + '_light_type').val() == "d") {
                room.content.node[i].light.type.directional.direction.x = $('#room_content_node' + i + '_light_type_directional_direction_x').val();
                room.content.node[i].light.type.directional.direction.y = $('#room_content_node' + i + '_light_type_directional_direction_y').val();
                room.content.node[i].light.type.directional.direction.z = $('#room_content_node' + i + '_light_type_directional_direction_z').val();

                room.content.node[i].light.type.point.attenuation.range = undefined;
                room.content.node[i].light.type.point.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.point.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.point.attenuation.manual.quadratic = undefined;

                room.content.node[i].light.type.spot.attenuation.range = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.constant = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.linear = undefined;
                room.content.node[i].light.type.spot.attenuation.manual.quadratic = undefined;
                room.content.node[i].light.type.spot.range.inner = undefined;
                room.content.node[i].light.type.spot.range.outer = undefined;
                room.content.node[i].light.type.spot.range.falloff = undefined;
                room.content.node[i].light.type.spot.direction.x = undefined;
                room.content.node[i].light.type.spot.direction.y = undefined;
                room.content.node[i].light.type.spot.direction.z = undefined;
            }
        }
        else if (room.nodeTypes[i] == "figure") {
            room.content.node[i].figure.width = $('#room_content_node' + i + '_figure_width');
            room.content.node[i].figure.height = $('#room_content_node' + i + '_figure_height');
            room.content.node[i].figure.materialName = $('#room_content_node' + i + '_figure_materialName');
            room.content.node[i].figure.castShadows = $('#room_content_node' + i + '_figure_castShadows');
            room.content.node[i].figure.draggable = $('#room_content_node' + i + '_figure_draggable');
        }
        else if (room.nodeTypes[i] == "plane") {
            room.content.node[i].plane.width = $('#room_content_node' + i + '_plane_width');
            room.content.node[i].plane.height = $('#room_content_node' + i + '_plane_height');
            room.content.node[i].plane.materialName = $('#room_content_node' + i + '_plane_materialName');
            room.content.node[i].plane.movablePlane = $('#room_content_node' + i + '_plane_movablePlane');
            room.content.node[i].plane.distance = $('#room_content_node' + i + '_plane_distance');
            room.content.node[i].plane.xSegment = $('#room_content_node' + i + '_plane_xSegment');
            room.content.node[i].plane.ySegment = $('#room_content_node' + i + '_plane_ySegment');
            room.content.node[i].plane.numTexCoordSets = $('#room_content_node' + i + '_plane_numTexCoordSets');
            room.content.node[i].plane.uTile = $('#room_content_node' + i + '_plane_uTile');
            room.content.node[i].plane.vTile = $('#room_content_node' + i + '_plane_vTile');
            room.content.node[i].plane.normals = $('#room_content_node' + i + '_plane_normals');
            room.content.node[i].plane.tangents = $('#room_content_node' + i + '_plane_tangents');
            room.content.node[i].plane.castShadows = $('#room_content_node' + i + '_plane_castShadows');
            room.content.node[i].plane.normal.x = $('#room_content_node' + i + '_plane_normal_x');
            room.content.node[i].plane.normal.y = $('#room_content_node' + i + '_plane_normal_y');
            room.content.node[i].plane.normal.z = $('#room_content_node' + i + '_plane_normal_z');
            room.content.node[i].plane.upVector.x = $('#room_content_node' + i + '_plane_upVector_x');
            room.content.node[i].plane.upVector.y = $('#room_content_node' + i + '_plane_upVector_y');
            room.content.node[i].plane.upVector.z = $('#room_content_node' + i + '_plane_upVector_z');
        }
    }
}

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

function GetTree() {
    var tree = {
        'core': {
            'data': [
               { "id": "ajson1", "parent": "#", "text": "room" },
               { "id": "ajson2", "parent": "ajson1", "text": "Settings" },
               { "id": "ajson3", "parent": "ajson2", "text": "Environment" },
               { "id": "ajson4", "parent": "ajson2", "text": "Pointer" },
               { "id": "ajson5", "parent": "ajson2", "text": "Boundaries" },
               { "id": "ajson6", "parent": "ajson2", "text": "Camera" },
               { "id": "ajson7", "parent": "ajson2", "text": "Browser Start Page" },
               { "id": "ajson8", "parent": "ajson2", "text": "Presentation" },
               { "id": "ajson9", "parent": "ajson1", "text": "Content" }
            ]
        }
    }
    for (var i = 0; i < room.nodeTypes.length; ++i) {
        tree.core.data.push(
            { "id": "ajson" + (i + 10), "parent": "ajson9", "text": room.content.node[i]['@'].name }
            );
    }
    return tree;
}
function ContentCreation() {
    var p = 0;
    var shown, shownValue, other1, other1Value, other2, other2Value;
    for (var i = 0; i < room.nodeTypes.length; ++i) {
        $('#content').append('<div class="hidden" id="content_node' + i + '">');//content_node1
        $('#content_node' + i).append('<div class="first" id="content_node' + i + '_name"><label>Node name:</label><input type="text" class"tex" id="content_node' + i + '_nameValue" value="' + room.content.node[i]['@'].name + '"></div>');//content_node1_nameValue
        $('#content_node' + i).append('<div class="second" id="content_node' + i + '_pose"><label>Pose:</label></div>');//content_node1_pose
        $('#content_node' + i + '_pose').append('<div class="third" id="content_node' + i + '_pose_position"><label>Position:</label><br><div class="fourth" id="content_node' + i + '_pose_positionValues"></div>');//content_node1_pose_position && content_node1_pose_positionValues
        $('#content_node' + i + '_pose_positionValues').append('<label>x:</label><input class="nums" type="number" id="content_node' + i + '_pose_position_x" value="' + room.content.node[i].pose.position.x + '"><br>');//content_node1_pose_position_x
        $('#content_node' + i + '_pose_positionValues').append('<label>y:</label><input class="nums" type="number" id="content_node' + i + '_pose_position_y" value="' + room.content.node[i].pose.position.y + '"><br>');//content_node1_pose_position_y
        $('#content_node' + i + '_pose_positionValues').append('<label>z:</label><input class="nums" type="number" id="content_node' + i + '_pose_position_z" value="' + room.content.node[i].pose.position.z + '"><br>'); //content_node1_pose_position_z
        $('#content_node' + i + '_pose').append('<div class="third"><label>Orientation:</label>');//content_node1_pose_orientetion
        $('#content_node' + i + '_pose').append('<select class="tex" id="content_node' + i + '_pose_orientation"><option value="q">Quaternion</option><option value="ang">Angle Axis</option><option value="rot">Rotation Matrix</option><option value="ypr">Yaw Pitch Roll</option></select><br><br>');
        $('#content_node' + i + '_pose').append(
            '<div class="fifth">' +
            '   <div class="fifth"id="node' + i + '_quaternion">' +
            '       <label>x: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qx" value="' + room.content.node[i].pose.orientation.quaternion.x + '"><br>' +
            '       <label>y: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qy" value="' + room.content.node[i].pose.orientation.quaternion.y + '"><br>' +
            '       <label>z: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qz" value="' + room.content.node[i].pose.orientation.quaternion.z + '"><br>' +
            '       <label>w: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_qw" value="' + room.content.node[i].pose.orientation.quaternion.w + '"><br> ' +
            '   </div>' +
            '   <div id="node' + i + '_angleAxis" class="hidden">' +
            '    <label>Angle: </label>' +
            '    <input class="nums" type="number" id="node' + i + '_pose_orientation_angle"><br>' +
            '    <label>Axis: </label>' +
            '       <div class="fifth">' +
            '           <label>x: </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_axis_x"><br>' +
            '           <label>y: </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_axis_y"><br>' +
            '           <label>z: </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_axis_z"><br>' +
            '       </div>' +
            '   </div>' +
            '   <div id="node' + i + '_ypr" class="hidden">' +
            '       <label>Yaw: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_yaw"><br>' +
            '       <label>Pitch: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_pitch"><br>' +
            '       <label>Roll: </label>' +
            '       <input class="nums" type="number" id="node' + i + '_pose_orientation_roll"><br>' +
            '   </div>' +
            '   <div id="node' + i + '_rotMatrix" class="hidden">' +
            '       <div class="fifth">' +
            '           <label>xx</label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_xx"><br>' +
            '           <label>xy </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_xy"><br>' +
            '           <label>xz </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_xz"><br>' +
            '           <label>yx</label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_yx"><br>' +
            '           <label>yy </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_yy"><br>' +
            '           <label>yz </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_yz"><br>' +
            '           <label>zx</label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_zx"><br>' +
            '           <label>zy </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_zy"><br>' +
            '           <label>zz </label>' +
            '           <input class="nums" type="number" id="node' + i + '_pose_orientation_zz"><br>' +
            '       </div>' +
            '   </div>' +
            '</div>'
        );
        if (room.nodeTypes[i] == "node") {
            $('#content_node' + i).append(
                '<div class="second">' +
                '   <label>Scales:</label><br>' +
                '       <div class ="third">' +
                '           <label>x:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_scale_x" value="' + room.content.node[i].scale.x + '"><br>' +
                '           <label>y:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_scale_y" value="' + room.content.node[i].scale.y + '"><br>' +
                '           <label>z:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_scale_z" value="' + room.content.node[i].scale.z + '"><br>' +
                '       </div>' +
                '</div>'
                );
            $('#content_node' + i).append(
                '<div class="second">' +
                '   <label>Entity:</label>' +
                '   <div class="third">' +
                '       <label>Mesh File Name:</label>' +
                '       <input type="text" class="tex" id="room_content_node' + i + '_entity_meshFileName" value="' + room.content.node[i].entity.meshFileName + '">' +
                '       <label>Cast Shadows:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_entity_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   </div>' +
                '</div>'
                );
            $('#room_content_node' + i + '_entity_castShadows').val(room.content.node[i].entity.castShadows);

        }
        else if (room.nodeTypes[i] == "light") {
            $('#content_node' + i).append(
                '<div class="second">' +
                '   <label>Light</label>' +
                '   <div class="third">' +
                '       <label>Diffuse</label>' +
                '       <div class="fourth">' +
                '           <label>r:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_r" value="' + room.content.node[i].light.diffuse.r + '"><br>' +
                '           <label>g:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_g" value="' + room.content.node[i].light.diffuse.g + '"><br>' +
                '           <label>b:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_b" value="' + room.content.node[i].light.diffuse.b + '"><br>' +
                '           <label>a:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_diffuse_a" value="' + room.content.node[i].light.diffuse.a + '"><br>' +
                '       </div>' +
                '        <label>Specular</label>' +
                '       <div class="fourth">' +
                '           <label>r:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_r" value="' + room.content.node[i].light.specular.r + '"><br>' +
                '           <label>g:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_g" value="' + room.content.node[i].light.specular.g + '"><br>' +
                '           <label>b:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_b" value="' + room.content.node[i].light.specular.b + '"><br>' +
                '           <label>a:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_specular_a" value="' + room.content.node[i].light.specular.a + '"><br>' +
                '       </div>' +
                '       <label>Offset</label>' +
                '       <div class="fourth">' +
                '           <label>x:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_offset_x" value="' + room.content.node[i].light.offset.x + '"><br>' +
                '           <label>y:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_offset_y" value="' + room.content.node[i].light.offset.y + '"><br>' +
                '           <label>z:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_offset_z" value="' + room.content.node[i].light.offset.z + '"><br>' +
                '       </div>' +
                '       <label>Cast Shadows:</label>' +
                '       <select class="tex" id="content_node' + i + '_light_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   </div>' +
                '</div>'
                );
            $('#content_node' + i + '_light_castShadows').val(room.content.node[i].light.castShadows);
            if (room.lightType[p] == 'spot') {
                shown = 'Spot';
                shownValue = 's';
                other1 = 'Directional';
                other1Value = 'd';
                other2 = 'Point';
                other2Value = 'p';
            }
            else if (room.lightType[p] == 'point') {
                shown = 'Point';
                shownValue = 'p';
                other1 = 'Directional';
                other1Value = 'd';
                other2 = 'Spot';
                other2Value = 's';
            }
            else if (room.lightType[p] == 'directional') {
                shown = 'Directional';
                shownValue = 'd';
                other1 = 'Spot';
                other1Value = 's';
                other2 = 'Point';
                other2Value = 'p';
            }
            ++p;
            $('#content_node' + i).append('<label>Type:</label>');
            $('#content_node' + i).append('<select class="tex" id="room_content_node' + i + '_light_type"><option value="' + shownValue + '">' + shown + '</option><option value="' + other1Value + '">' + other1 + '</option><option value="' + other2Value + '">' + other2 + '</option></select><br><br>');
            $('#content_node' + i).append(
                '<div class="fifth">' +
                '   <div class="fifth hidden" id="room_content_node' + i + '_light_type_point">' +
                '       <label>Attenuation: </label>' +
                '       <div class="fifth">' +
                '           <label>Range:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_range" value="' + room.content.node[i].light.type.point.attenuation.range + '"><br>' +
                '           <label>Manual: </label>' +
                '           <div class="fifth">' +
                '               <label>Constant:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_manual_constant" value="' + room.content.node[i].light.type.point.attenuation.manual.constant + '"><br>' +
                '               <label>Linear: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_manual_linear" value="' + room.content.node[i].light.type.point.attenuation.manual.linear + '"><br>' +
                '               <label>Quadratic: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_point_attenuation_manual_quadratic" value="' + room.content.node[i].light.type.point.attenuation.manual.quadratic + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '   <div class="fifth hidden" id="room_content_node' + i + '_light_type_directional">' +
                '       <label>Direction: </label>' +
                '           <div class="fifth">' +
                '               <label>x:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_directional_direction_x" value="' + room.content.node[i].light.type.directional.direction.x + '"><br>' +
                '               <label>y: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_directional_direction_y" value="' + room.content.node[i].light.type.directional.direction.y + '"><br>' +
                '               <label>z: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_directional_direction_z" value="' + room.content.node[i].light.type.directional.direction.z + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '     <div class="fifth hidden" id="room_content_node' + i + '_light_type_spot">' +
                '       <label>Range:</label>' +
                '       <div class="fifth">' +
                '           <label>Inner: </label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_range_inner" value="' + room.content.node[i].light.type.spot.range.inner + '"><br>' +
                '           <label>Outer: </label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_range_outer" value="' + room.content.node[i].light.type.spot.range.outer + '"><br>' +
                '           <label>Fall off: </label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_range_falloff" value="' + room.content.node[i].light.type.spot.range.falloff + '"><br>' +
                '       </div>' +
                '       <label>Attenuation: </label>' +
                '       <div class="fifth">' +
                '           <label>Range:</label>' +
                '           <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_range" value="' + room.content.node[i].light.type.spot.attenuation.range + '"><br>' +
                '           <label>Manual: </label>' +
                '           <div class="fifth">' +
                '               <label>Constant:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_manual_constant" value="' + room.content.node[i].light.type.spot.attenuation.manual.constant + '"><br>' +
                '               <label>Linear: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_manual_linear" value="' + room.content.node[i].light.type.spot.attenuation.manual.linear + '"><br>' +
                '               <label>Quadratic: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_attenuation_manual_quadratic" value="' + room.content.node[i].light.type.spot.attenuation.manual.quadratic + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '       <label>Direction: </label>' +
                '           <div class="fifth">' +
                '               <label>x:</label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_direction_x" value="' + room.content.node[i].light.type.spot.direction.x + '"><br>' +
                '               <label>y: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_direction_y" value="' + room.content.node[i].light.type.spot.direction.y + '"><br>' +
                '               <label>z: </label>' +
                '               <input class="nums" type="number" id="room_content_node' + i + '_light_type_spot_direction_z" value="' + room.content.node[i].light.type.spot.direction.z + '"><br> ' +
                '           </div>' +
                '       </div>' +
                '   </div>' +
                '</div>'
            );
        }
        else if (room.nodeTypes[i] == "browser") {
            $('#content_node' + i).append(
                '<label>Browser:</label>' +
                '<div class="second">' +
                '   <label>url:</label>' +
                '   <input class="tex" type="text" id="room_content_node' + i + '_browser_url" value="' + room.content.node[i].browser.url + '"><br><br>' +
                '   <label>Shared:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_browser_shared">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Draggable:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_browser_draggable">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Snapped to wall:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_browser_snappedToWall">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Width:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_width" value="' + room.content.node[i].browser.width + '"><br>' +
                '   <label>Height:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_height" value="' + room.content.node[i].browser.height + '"><br>' +
                '   <label>Resolution Horisontal:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_resH" value="' + room.content.node[i].browser.resH + '"><br>' +
                '   <label>Resolution Vertical:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_resV" value="' + room.content.node[i].browser.resV + '"><br>' +
                '   <label>Zoom:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_browser_zoom" value="' + room.content.node[i].browser.zoom + '"><br>' +
                '</div>'
                );

            $('#room_content_node' + i + '_browser_shared').val(room.content.node[i].browser.shared);
            $('#room_content_node' + i + '_browser_draggable').val(room.content.node[i].browser.draggable);
            $('#room_content_node' + i + '_browser_snappedToWall').val(room.content.node[i].browser.snappedToWall);
        }
        else if (room.nodeTypes[i] == "figure") {
            $('#content_node' + i).append(
                '<label>Figure:</label>' +
                '<div class="second">' +
                '   <label>Width:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_figure_width" value="' + room.content.node[i].figure.width + '"><br>' +
                '   <label>Height:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_figure_height" value="' + room.content.node[i].figure.height + '"><br>' +
                '   <label>Material Name: </label>' +
                '   <input type="text" class="tex" id="room_content_node' + i + '_figure_materialName" value="' + room.content.node[i].figure.materialName + '"><br>' +
                '   <label>Draggable:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_figure_draggable">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Cast Shadows:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_figure_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '</div>'
                );

            $('#room_content_node' + i + '_figure_draggable').val(room.content.node[i].figure.draggable);
            $('#room_content_node' + i + '_figure_castShadows').val(room.content.node[i].figure.castShadows);
        }
        else if (room.nodeTypes[i] == "plane") {
            $('#content_node' + i).append(
                '<label>Plane:</label>' +
                '<div class="second">' +
                '   <label>Width:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_width" value="' + room.content.node[i].plane.width + '"><br>' +
                '   <label>Height:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_height" value="' + room.content.node[i].plane.height + '"><br>' +
                '   <label>Material Name: </label>' +
                '   <input type="text" class="tex" id="room_content_node' + i + '_plane_materialName" value="' + room.content.node[i].plane.materialName + '">' +

                '   <label>Movable Plane: </label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_movablePlane">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Distance:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_distance" value="' + room.content.node[i].plane.distance + '"><br>' +
                '   <label>xSegment:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_xSegment" value="' + room.content.node[i].plane.xSegment + '"><br>' +
                '   <label>ySegment:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_ySegment" value="' + room.content.node[i].plane.ySegment + '"><br>' +
                '   <label>Nember of Texture Coordinates Sets:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_numTexCoordSets" value="' + room.content.node[i].plane.numTexCoordSets + '"><br>' +
                '   <label>uTile:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_uTile" value="' + room.content.node[i].plane.uTile + '"><br>' +
                '   <label>vTile:</label>' +
                '   <input class="nums" type="number" id="room_content_node' + i + '_plane_vTile" value="' + room.content.node[i].plane.vTile + '"><br>' +
                '   <label>Normals: </label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_normals">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Tangents: </label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_tangents">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +

                '   <label>Cast Shadows:</label>' +
                '       <select class="tex" id="room_content_node' + i + '_plane_castShadows">' +
                '           <option value=""></option>' +
                '           <option value="true">True</option>' +
                '           <option value="false">False</option>' +
                '       </select><br>' +
                '   <label>Normal:</label>' +
                '   <div class="third">' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_normal_x" value="' + room.content.node[i].plane.normal.x + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_normal_y" value="' + room.content.node[i].plane.normal.y + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_normal_z" value="' + room.content.node[i].plane.normal.z + '"><br>' +
                '   </div>' +
                '   <label>upVector:</label>' +
                '   <div class="third">' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_upVector_x" value="' + room.content.node[i].plane.upVector.x + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_upVector_y" value="' + room.content.node[i].plane.upVector.y + '"><br>' +
                '       <input class="nums" type="number" id="room_content_node' + i + '_plane_upVector_z" value="' + room.content.node[i].plane.upVector.z + '"><br>' +
                '   </div>' +
                '   ' +
                '</div>'

                );

            $('#room_content_node' + i + '_plane_normals').val(room.content.node[i].plane.normals);
            $('#room_content_node' + i + '_plane_tangents').val(room.content.node[i].plane.tangents);

            $('#room_content_node' + i + '_plane_castShadows').val(room.content.node[i].plane.castShadows);
            $('#room_content_node' + i + '_plane_movablePlane').val(room.content.node[i].plane.movablePlane);
        }




    }
}