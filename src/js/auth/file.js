import { supabase } from "../main";
import QRCode, { create } from 'qrcode'

// import {useEffect, useState} from "react";

// import { createClient } from "@supabase/supabase-js";
// import {v4 as uuidv4} from 'uuid';


// 
//import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";

// import { Camera, CameraResultType } from '@ionic-native/camera/ngx';

// async takePicture() {
//   const options: CameraOptions = {
//     quality: 100,
//     destinationType: this.camera.DestinationType.DATA_URL,
//     encodingType: this.camera.EncodingType.JPEG,
//     mediaType: this.camera.MediaType.PICTURE,
//     allowEdit: true,
//   };

//   try {
//     const imageData = await this.camera.getPicture(options);
//     // Process image data (base64) for upload
//   } catch (err) {
//     console.error(err);
//   }
// }

supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
        // User is signed in
        // console.log("User is signed in. Session:", session);
        const userId = session.user.id;
        // console.log("User ID:", userId);
        // const userInfo = loginUser(userId);
        loginUser(userId);


    } else if (event === 'SIGNED_OUT') {
        // User is signed out
        console.log("User is signed out.");
    }
});

async function loginUser(userId) {
    try {
        const userInfo = await supabase.
        from('user_info').
        select('*').
        eq('user_id', userId);



        // console.log(userInfo.data[0]);
        // return userInfo
        // const id_qrcode = document.getElementById('id_qrcode');
        const firstname = document.getElementById('firstname');
        const lastname = document.getElementById('lastname');
        // const profile = document.getElementById('profile');
        if (userInfo) {

            // QRCode.toString(userInfo.data[0].user_id, {type:'terminal'}, function (err, url) {
            //     // console.log(url)
            //     id_qrcode.innerHTML= url;
            // })
            firstname.innerText = userInfo.data[0].firstname;
            lastname.innerText = userInfo.data[0].lastname;
            // profile.innerHTML = `<img class="pt-3 mx-auto" src="${userInfo.data[0].profile}" alt="${userInfo.data[0].user_id}" style="width: 18rem; height: 18rem;"></img>`;
        } else {
            console.error('User info not found.');
        }
        // console.log(userInfo);
        // firstname.innerHTML = `${userInfo.data[0].firstname}`;
    } catch (error) {
        console.error("Error viewing error:", error.message);
    }
}
// loginUser();

function myFunction(){
    const userId = supabase.auth.onAuthStateChange((event, session) => {
        console.log( session.user.id);
    
        async function uploadImage(e){
            let file = e.target.files[0];

            const { data, error } = await supabase
            .storage
            .from('profiles')
            .upload(session.user.id + "/" + uuidv4, file)

            if(data){
                getMedia();
            } else {
                console.log(error);
            }
        }

        async function getMedia(){

            const { data, error } = await supabase.storage.from('profiles').list(session.user.id + '/', {
                limit: 10,
                offset: 0,
                sortBy: {
                    column: 'name', 
                    order: 'asc'
                }
            });

            if(data){
                setMedia(data);
            } else {
                console.log(71, error);
            }
        }
    });

}
// App()