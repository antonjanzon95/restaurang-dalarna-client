import { Component, Input } from '@angular/core';
import { ITable } from 'src/app/models/ITable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() table: ITable | undefined;

  
}
