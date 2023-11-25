# Microfrotnend-socialmedia/root-application

This application is a part of Social media microfrontend project. It is the root application built using mui, reactjs with  and for routing react-router-dom has been used.

Webpack@5 has been used as module bundle in this project.

### You can find links of all the microfrontends repos created for this project below :

* [Post_mf](https://github.com/KshitijRaj09/post_mf)
* [People_mf](https://github.com/KshitijRaj09/people_mf)
* [Messenger_mf](https://github.com/KshitijRaj09/messenger_mf)
* [Account_mf](https://github.com/KshitijRaj09/account_mf)
* [Sharedlib_mf](https://github.com/KshitijRaj09/sharedlib)


### How to run in local

> [!IMPORTANT]
#### Change below line of code in files to run in local, some configurations are done to run the application in github pages
* Change `publicPath` in webpack.config.js : ```publicPath : '/' ```.
* comment react-router-dom `basename` in `Root` file.
* Change in `Root` file
   ```
   {
      path: "/", // blank in case of github pages else "/"
      element: <MainPage />,
   },
   ```
* Check `remote-url.js` file and do the changes accroding to your need.
* Check `scripts` in `package.json` file to run the application.