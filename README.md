#  Blogger / News Overview


This is a `personal`  project:  a blogger / news app giving registred user acces to add new posts update,remove theme too 
also read news by categories and manage theme in favorites .
the `admin` have access to  `authors section and setting section` they can manage all authors, and also have privileges to modify the application authorizations and settings for users.

[view project site here](https://portfolio-messages-780f3.web.app/).



![alt text](https://imgur.com/MH5rfzS.png).

## Technologies



`Angular Material` for ui .

 `AngularFire` : Firestore , Auth , Storage , Hosting .
 
 `Forms` : Reactive / Template driven Forms .
 
 `Angular Anmitaion , Rxjs , NgRx`.



## Project sections and Goal

the app is fully responsive and mobile first approach , using angular material for the ui .

home page:

users after login can read ,add new posts and edit,delete posts.

having a filter component to filter posts.

and adding a wheather app component that show actual wheather condition basing on geolocalisation of the user.


![alt text](https://imgur.com/MH5rfzS.png).

add posts:

user can upload image for his post ,using firebase storage to uplad and download the images from storage.

adding CKEditor 5 for a nice posts writing experience.


![alt text](https://imgur.com/kmWl0X6.png).

Signup section :

using reactive forms and formArray allow user adding hobbies ..


![alt text](https://imgur.com/YAz0rhc.png).

Profile section:

user can delete his own account .

![alt text](https://imgur.com/8yvvxGZ.png).

Authors  section:

using material tables to show authors information using (filtring , sorting , pagination ) .


![alt text](https://imgur.com/y6xXKnN.png).



can view the details of each author .
add new author using stepper component by angular material to manage adding new author to the database .

![alt text](https://imgur.com/z33FFdK.png).



##Authentication && admin 


using firebase auth for Authentication by using AngularFire to use the service .
only the user who is auth and with the `same id` can add or remove his own posts , and maanging that from the backend by using the firebase rules to restrict other users to modify other users post.
only the admin who have the rights to modify and delete any users data or created posts .

setting section :
managed by the admin 

![alt text](https://imgur.com/UmtjtJw.png).


## Errors handling  && loaders

using errors handling messages and loaders for a better user experiences .


![alt text](https://imgur.com/SxNrwvF.png).

