import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({//decorator
  providedIn: 'root'
})
//service is used to generally connect to backend
//controller doesnt directly communicate to backend--bad practise
//controller communicate to->service->backend
//@Injectable=>this service make use of dependency injections ;that is it can be injected wereever you want 
export class BackendAccessService {

  constructor(private http:HttpClient){

  }
  expresponse:string="";
  deleteresponse:string="";
  contactresponse:string="";
  editresponse:string="";
  userList:any=[];
  contactsList:any=[];

  addUser(udata:any):any{ //add user of any type
    this.http.post("http://localhost:4000/insert", udata.value).
    subscribe((response) => {
      this.expresponse=response.toString();
      //console.log(udata.value);
        //console.log("User data successfully added:", response);
        // Optionally, you can add the response to your userList if needed.
         //this.userList.push(response);
      });
      return this.expresponse;
      // (error) => {
      //   console.error("Error adding user data:", error);
      // }); 
  }

  getAllUsers(){
    this.http.get('http://localhost:4000/getall').subscribe((response)=>{
      this.userList=response;
      console.log(this.userList);
  });
  return this.userList;
  }
  getAllContacts(){
    this.http.get('http://localhost:4000/getall').subscribe((response)=>{
      this.contactsList=response;
      console.log(this.contactsList);
  });
  return this.contactsList;
  }
  // addContact(udata:any):any{ //add user of any type
  //   this.http.post("http://localhost:4000/adduser", udata.value).
  //   subscribe((response) => {
  //     console.log(udata.value);
  //     console.log(response);

  //     this.contactresponse=response.toString();
  //     });
  //     return this.contactresponse;
  // }
  addContact(contactData: any): any {
    this.http.post("http://localhost:4000/addContact", contactData.value)
      .subscribe((response) => {
        // console.log(contactData);
        // console.log(response);
        this.expresponse = response.toString();
      });
    return this.expresponse;
  }
  deletecontact(id: string) {
    this.http
      .delete(`http://localhost:4000/deleteContact/${id}`)
      .subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          console.log(response);
          this.deleteresponse = 'Contact deleted successfully: ' + JSON.stringify(response);
          // Optionally, you can remove the deleted user from your userList if needed.
          // this.userList = this.userList.filter((user) => user.userid !== userid);
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.deleteresponse = 'Error deleting contact: ' + error.message;
        }
      );
  }
  
  // updateContact(id: string, contactData: any): any {
  //   this.http.put(`http://localhost:4000/updateContact/${id}`,contactData)
  //     .subscribe((response) => {
  //       console.log(contactData);
  //       console.log(response);
  //       this.editresponse = response.toString();
  //       this.getAllContacts();
  //     });
  //   return this.editresponse;
  // }

  updateContact(contactId: string, updatedData: any): any {
    this.http.put(`http://localhost:4000/updateContact/${contactId}`, updatedData).subscribe(
      (response) => {
        console.log(`Contact with ID ${contactId} updated successfully.`, response);
        this.expresponse = `Contact with ID ${contactId} updated successfully.`;
      },
      (error) => {
        console.error('Error updating contact:', error);
        this.expresponse = 'Error updating contact: ' + error.message;
      }
    );
    return this.expresponse;
  }
}
