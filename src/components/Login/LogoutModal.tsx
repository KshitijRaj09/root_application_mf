import React, {Suspense} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import {
   ListItemButton,
   ListItemIcon,
   ListItemText,
   SvgIconProps,
   Typography,
} from "@mui/material";
import Loader from "../Loaders";

type LogoutModalPropstype = {
   text: String;
   icon: React.ReactElement<SvgIconProps>;
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutModal = ({
   text,
   icon,
   setIsAuthenticated,
}: LogoutModalPropstype) => {
   const [open, setOpen] = React.useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const logout = () => {
      sessionStorage.clear();
      setIsAuthenticated(false);
      handleClose();
   };

   return (
      <>
         <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
         </ListItemButton>
         <Suspense fallback={<Loader />}>
            <Dialog
               open={open}
               onClose={handleClose}
               aria-labelledby='alert-dialog-title'
               aria-describedby='alert-dialog-description'>
               <Typography
                  id='alert-dialog-title'
                  variant='h6'
                  sx={{padding: "20px"}}>
                  Are you sure want to logout?
               </Typography>
               <DialogActions>
                  <Button onClick={handleClose}>Close</Button>
                  <Button onClick={logout} autoFocus>
                     Confirm
                  </Button>
               </DialogActions>
            </Dialog>
         </Suspense>
      </>
   );
};

export default LogoutModal;
