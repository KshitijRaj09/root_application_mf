export type isUserIdExistPropType = {
    isExistingUser: boolean;
    setIsExistingUser: React.Dispatch<React.SetStateAction<boolean>>;
};

export enum PageEnum{
    Posts= 'Posts',
    People= 'People',
    Account= 'Account',
    Messenger= 'Messenger',
    Logout= 'Logout'
}