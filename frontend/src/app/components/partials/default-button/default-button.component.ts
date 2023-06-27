import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.css']
})
export class DefaultButtonComponent implements OnInit {
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() text: string = 'Submit';
  @Input() bgColor: string = '';
  @Input() color: string = '';
  @Input() fontSizeRem: number;
  @Input() widthRem: number;
  @Input() styleClass: string;
  @Output() onClick = new EventEmitter<any>();

  ngOnInit(): void {
  }


}
