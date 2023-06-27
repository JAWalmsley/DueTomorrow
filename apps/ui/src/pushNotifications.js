
export async function subscribeToPush(registration) {
    const options = {
        userVisibleOnly: true,
        applicationServerKey: 'BJtmkYnihcjp50XHbaJrr4JF8TdBkCnDOmAGGSLW-7WkjmiYPG6MGZ2bUKZK0Lh5x3XD5XL6my5W41LzAZ9Tlm8'
    };

    const pushSubscription = await registration.pushManager.subscribe(options);
    console.log(
        'Received PushSubscription: ',
        JSON.stringify(pushSubscription),
    );
    console.log("Your userid is", localStorage.getItem('userid'));
    return pushSubscription;
}