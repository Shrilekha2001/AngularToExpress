import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BackendAccessService } from './backend-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularexpress';
  userList:any=[];
  data:any;
  expresponse:string="";
  constructor(private http:HttpClient,
   private bacces:BackendAccessService){

  }

  addUser(udata:any){ //add user of any type 
    //u have to call this controller to make comunicate with service
    this.expresponse=this.bacces.addUser(udata);
  }

  getAllUsers():any{
    this.userList=this.bacces.getAllUsers();
  }
  // deleteUser(userid: string) {
  //   this.http
  //     .post('http://localhost:4000/delete', { body: { uid: userid } })
  //     .subscribe(
  //       (response) => {
  //         console.log('User deleted successfully:', response);
  //         this.expresponse = 'User deleted successfully: ' + JSON.stringify(response);
  //         // Optionally, you can remove the deleted user from your userList if needed.
  //         // this.userList = this.userList.filter((user) => user.userid !== userid);
  //       },
  //       (error) => {
  //         console.error('Error deleting user:', error);
  //         this.expresponse = 'Error deleting user: ' + error.message;
  //       }
  //     );
  // }

  deleteUser(userid: string) {
    this.http
      .delete(`http://localhost:4000/delete/${userid}`)
      .subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          console.log(response);
          this.expresponse = 'User deleted successfully: ' + JSON.stringify(response);
          // Optionally, you can remove the deleted user from your userList if needed.
          // this.userList = this.userList.filter((user) => user.userid !== userid);
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.expresponse = 'Error deleting user: ' + error.message;
        }
      );
  }

//   updateUser(udata: any) {
//     const userId = udata.value.uid; // User ID to update
//     this.http.put(`http://localhost:4000/update/${userId}`, udata.value)
//         .subscribe(
//             (response) => {
//                 console.log('User updated successfully:', response);
//                 this.expresponse = 'User updated successfully: ' + JSON.stringify(response);
//                 // Optionally, you can update the user's data in your userList if needed.
//                 // this.userList = this.userList.map((user) => {
//                 //     if (user.userid === userId) {
//                 //         return response;
//                 //     }
//                 //     return user;
//                 // });
//             },
//             (error) => {
//                 console.error('Error updating user:', error);
//                 this.expresponse = 'Error updating user: ' + error.message;
//             }
//         );
// }
// isUpdate:boolean =false;
// currentIndex :any;
// edit(user :any,index:any){
//   this.isUpdate =true;
//   this.currentIndex=index;
// }
// updateUser(udata: any) {
//   const userId = udata.value.userid; // User ID to update

//   this.http.put(`http://localhost:4000/update/${userId}`, udata.value)
//     .subscribe(
//       (response) => {
//         console.log('User updated successfully:', response);
//         this.expresponse = 'User updated successfully: ' + JSON.stringify(response);
//         this.userList[this.currentIndex] = udata.value; // Update the user in the userList array
//         this.isUpdate = false; // Exit the update mode
//       },
//       (error) => {
//         console.error('Error updating user:', error);
//         this.expresponse = 'Error updating user: ' + error.message;
//       }
//     );
// }

  
isUpdate: boolean = false;
currentIndex: any;
selectedUser: any = {}; // To store the selected user for editing

edit(user: any, index: any) {
  this.isUpdate = true;
  this.currentIndex = index;
  this.selectedUser = { ...user }; // Copy the selected user data for editing
}

update() {
  const userId = this.selectedUser.userid; // User ID to update

  this.http.post(`http://localhost:4000/update/${userId}`, this.selectedUser)
    .subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        this.expresponse = 'User updated successfully: ' + JSON.stringify(response);
        this.userList[this.currentIndex] = this.selectedUser; // Update the user in the userList array
        this.isUpdate = false; // Exit the update mode
      },
      (error) => {
        console.error('Error updating user:', error);
        this.expresponse = 'Error updating user: ' + error.message;
      }
    );
}

}