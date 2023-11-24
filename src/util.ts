type UserInfoType = {
  username: string;
  name: string;
  avatar: string;
  userid: string;
}

export const getAccessToken = () => sessionStorage.getItem("userToken");
export const setAccessToken = (token: string) =>
    sessionStorage.setItem("userToken", token);
export const clearAccessToken = () => sessionStorage.removeItem("userToken");

export const setUserInfoInStorage = (userInfo: UserInfoType) =>
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
export const getUserInfoFromStorage = () => sessionStorage.getItem("userInfo");
export const clearUserInfoFromStorage = () => sessionStorage.removeItem("userInfo");


export const appendLeadingZero = (input: number): string =>
    input < 10 ? `0${input}` : `${input}`;

export const dateFormatter = (
    inputDate: Date,
    isTimeStampRequired: boolean
): string => {
    const date = new Date(inputDate);
    let day: number = date.getDate();
    let month: number = date.getMonth();
    let hour: number = date.getHours();
    let minutes: number = date.getMinutes();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    return isTimeStampRequired
        ? `${day} ${months[month]
        } ${date.getFullYear()}, ${appendLeadingZero(hour)}:${appendLeadingZero(minutes)}` : `${day} ${months[month]} ${date.getFullYear()}`;
};

export const EventEmitter = {
  events: {},
  dispatch: function (event: any, data: any) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback: any) => callback(data));
  },
  subscribe: function (event: any, callback: any) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },
};


export const sendNotification = (message: string, userInfo: { avatar: string, username: string }) => {
  if (document.hidden) {
    const notification = new Notification("New message from Connect-APP", {
      icon: userInfo.avatar || "https://pngtree.com/freepng/message-icon-for-your-project_5214044.html",
      body: `${userInfo.username}: ${message}`
    })
    notification.onclick = (event) => {
      event.preventDefault();
      window.open(`${location.origin}/messenger`)
    }
  }
}

export const checkNotificationStatus = (message: string, userInfo: { avatar: string, username: string }) => {
  if (!getUserInfoFromStorage()) {
    return;
  }
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications!")
  }
  else if (Notification.permission === "granted") {
    sendNotification(message, userInfo)
  }
  else if (Notification.permission === "default") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        sendNotification(message, userInfo);
      }
    });
  }
  else {
    alert("Notifications blocked. Please enable it in your browser.");
  }
}

// const debounce = <Type,>(callback: Type) => {

// }