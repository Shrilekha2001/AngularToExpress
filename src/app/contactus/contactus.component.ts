import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BackendAccessService } from '.././backend-access.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {
  contactList:any=[];
  contactresponse:string="";
  deleteresponse: any = "";
  editresponse:any="";
  operationMode: string = "add";
  id:string="";
  expresponse: string = '';
  selectedContact: any = {};
  constructor(private http:HttpClient,
    private bacces:BackendAccessService){
 
   }
   ngOnInit():void{
    this.getAllContacts();
  }
  getAllContacts():any{
    this.contactList=this.bacces.getAllContacts();
  }
  // addContact(contactData:any){ //add user of any type 
  //   //u have to call this controller to make comunicate with service
  //   this.contactresponse=this.bacces.addContact(contactData);
  // }

  addContact(contactData: any) {
    this.expresponse=this.bacces.addContact(contactData);
    this.getAllContacts();
  }

  deletecontact(id: string): any {
    this.deleteresponse=this.bacces.deletecontact(id);
  }

  // updateContact(id: string, contactData: any):any{
  //   this.editresponse=this.bacces.updateContact(id, contactData);
  // }

  // handleContact(id: string, contactData: any): any {
  //   if (this.operationMode === "add") {
  //     this.addContact(contactData);
  //   } else if (this.operationMode === "update") {
  //     this.updateContact(id, contactData);
  //   }
  // }

  setUpdateMode(id:string): void {
    this.operationMode = "update";
    this.id=id;
  }

  prepareUpdate(contact: any) {
    this.selectedContact = {...contact};
}
 
updateContact() {
  const contactId = this.selectedContact.id;
  this.bacces.updateContact(contactId, this.selectedContact).subscribe(
    (response: any) => {
      console.log(`Contact with ID ${contactId} updated successfully.`, response);
      this.expresponse = `Contact with ID ${contactId} updated successfully.`;
      this.getAllContacts(); // Refresh the contact list after updating
      this.selectedContact = null; // Reset after the update
    },
    (error: any) => {
      console.error('Error updating contact:', error);
      this.expresponse = 'Error updating contact: ' + error.message;
    }
  );
}
  
}
