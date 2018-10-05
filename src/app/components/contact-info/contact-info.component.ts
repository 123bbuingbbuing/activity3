import { Component, OnInit } from '@angular/core';
import { Contacts } from '../../models/Contacts';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html'
})
export class ContactInfoComponent implements OnInit {
  contact: Contacts;

  constructor(
    private route: ActivatedRoute,
    private ContactService: ContactsService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ContactService.viewContactInfo(Number(id)).subscribe(contact_info =>
      this.contact = contact_info
    );
  }

}
