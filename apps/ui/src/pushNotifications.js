import { APIPushRegister, APIPushRenew } from "./api";

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}    

export async function subscribeToPush(registration) {
    const options = {
        userVisibleOnly: true,
        applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC
    };
    const pushSubscription = await registration.pushManager.subscribe(options);
    // console.log(
    //     'Received new PushSubscription: ',
    //     JSON.stringify(pushSubscription),
    // );
    await APIPushRegister({userid: localStorage.getItem('userid'), subscription: pushSubscription});
    return pushSubscription;
}

export async function renewSubscription(newSubscription, oldSubscription) {
  await APIPushRenew({userid: localStorage.getItem('userid'), newSubscription: newSubscription, oldSubscription: oldSubscription});
}