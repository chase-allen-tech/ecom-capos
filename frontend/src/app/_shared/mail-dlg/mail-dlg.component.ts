import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mail-dlg',
  templateUrl: './mail-dlg.component.html',
  styleUrls: ['./mail-dlg.component.scss']
})
export class MailDlgComponent implements OnInit {
  mailForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MailDlgComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.mailForm = this.fb.group({
      email_from: ['', [Validators.email]],
      email_to: ['', [Validators.required, Validators.email]],
      subject: [data.subject],
      recipient: ['', Validators.required],
      message: ['']
    });
  }

  ngOnInit(): void {
  }

  sendMail(): void {
    if (this.mailForm.invalid) {
      return;
    }
    this.data.content = this.mailForm.value;
    this.dialogRef.close(this.data);
  }
}
