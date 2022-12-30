import { useState } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { AlertNotification } from "../types";



var stompClient: any = null;

export const useAlertNotificationWebSocket = () => {

    const [newNotifify, setnewNotifify] = useState<AlertNotification>({id: ""});

    const connect = () => {
        
        //let Sock = new SockJS('https://sit-backend.herokuapp.com/ws');
        let Sock = new SockJS('http://47.242.179.181:8080/controller/ws');
        //let Sock = new SockJS('http://localhost:3334/notifications');
        
        stompClient = over(Sock);
        stompClient.debug = () => {};
        stompClient.connect({}, onConnected, onError);
    }
    const onConnected = () => {
        let tokenString = localStorage.getItem('auth');
        if (!tokenString) tokenString = ""
        let token = JSON.parse(tokenString);
        //stompClient.subscribe('/route/' + '55580' + '/private', onPrivateMessage);
        //stompClient.subscribe('/user/' + 'admin@sit.com' + '/web/notification', onPrivateMessage);
        stompClient.subscribe('/user/' + token.username + '/web/notification', onPrivateMessage);
        //stompClient.subscribe('/private', onPrivateMessage);
    };
    let onPrivateMessage = (payload: any) => {

        console.log(payload);
        var payloadData: any = JSON.parse(payload.body);


        const nD: AlertNotification = payloadData as AlertNotification;
        setnewNotifify(nD);

    };
    const onError = (err: any) => {
        console.log("ERRORORORO")
        console.log(err);
    }




    return {
        connect,
        newNotifify
    }
}