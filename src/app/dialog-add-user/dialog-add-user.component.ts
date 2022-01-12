import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent> ,private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);

    this.firestore.collection('users').add(this.user.toJSON()).then((result: any) => {
      console.log('User added', result);
      this.loading = false;
      this.dialogRef.close();
    }); 
  }

}
