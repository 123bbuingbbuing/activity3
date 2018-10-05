import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Contacts } from '../../models/Contacts';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  @ViewChild('contactForm') form: any;
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('dltScss') dltScss: ElementRef;


  contacts: Contacts[];
  showContactForm: boolean = false;
  showContactList: boolean = true;
  isEdit: boolean = false;
  showSuccessDelete: boolean = false;

  contact: Contacts = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    username: ''
  };
  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(contact => {
      this.contacts = contact;
    });
  }

  closeThisModal() {
    let el: HTMLElement = this.closeModal.nativeElement as HTMLElement;
    el.click();
  }

  closeThisAlert() {
    let el: HTMLElement = this.dltScss.nativeElement as HTMLElement;
    el.click();
  }

  resetForm() {
      this.contact.name = '';
      this.contact.phone = '';
      this.contact.username = '';
      this.contact.email = '';
      this.isEdit = false;
  }

  closeForm() {
    this.showContactForm = false;
    this.showContactList = true;
  }

  addContact(contact: Contacts) {
    // this.contacts.unshift(contact);
    // this.postService.savePost(contact).subscribe(contact_info => {
    //   this.newPost.emit(post);
    // });
    this.closeForm();
  }

  editContact(contact: Contacts){
    this.contact = contact;
    this.showContactForm = true;
    this.isEdit = true;
    this.showContactList = false;
  }

  updateContact(contact_info: Contacts) {
    this.contacts.forEach((cur, index) => {
      if (contact_info.id === cur.id) {
        this.contacts.splice(index, 1);
        this.contacts.unshift(contact_info);
        this.contact.id = 0;
        this.closeForm();
      }
    });
  }

  removeContact(contact: Contacts) {
    this.contactService.removePost(contact.id).subscribe(() => {
      this.contacts.forEach((cur, index) => {
        if (contact.id === cur.id) {
          this.contacts.splice(index, 1);
          this.closeThisModal();
          this.showSuccessDelete = true;
          setTimeout(() => {
            this.closeThisAlert();
          }, 3000);
        }
       });
    });
  }

  passDataToMdl(contact_info: Contacts) {
    this.contact = contact_info;
  }

}
