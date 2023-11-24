declare module "Account/Account" {
   const Account: React.ComponentType;
   export default Account;
}

declare module "People/People" {
   const People: React.ComponentType;
   export default People;
}

declare module "People/PeopleDetailPage" {
   const PeopleDetailsPage: React.ComponentType;
   export default PeopleDetailsPage;
}

declare module "People/RecommendedPeople" {
   const RecommendedPeople: React.ComponentType;
   export default RecommendedPeople;
}

declare module "Messenger/Messenger" {
   const Messenger: React.ComponentType;
   export default Messenger;
}

declare module "Post/Post" {
   const Post: React.ComponentType;
   export default Post;
}

declare module "Sharedlib/theme" {
   import { CustomTheme } from "@kshitijraj09/sharedlib_mf";
   const theme: typeof CustomTheme
   export default theme;
}

declare module "Sharedlib/eventservice" {
   import { WindowEventService as windowEventService, WindowEvents as windowEvents, UserInfoType } from "@kshitijraj09/sharedlib_mf";
   const WindowEventService: typeof windowEventService;
   const WindowEvents: typeof windowEvents;
   const UserInfoType: UserInfoType;  
   export default WindowEventService;
   export { WindowEvents, UserInfoType };
}
 