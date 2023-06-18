import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dataSource = ELEMENT_DATA;


  displayedColumns = ['id', 'name', 'weight', 'descriptions'];

  spans = [];


  constructor() {
    this.cacheSpan('Priority', d => d.id);
    this.cacheSpan('Name', d => d.name);
    this.cacheSpan('Weight', d => d.weight);
    console.log(this.spans);
  }

  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
  cacheSpan(key, accessor) {
    for (let i = 0; i < DATA.length;) {
      let currentValue = accessor(DATA[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < DATA.length; j++) {
        if (currentValue != accessor(DATA[j])) {
          break;
        }

        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {    
    return this.spans[index] && this.spans[index][col];
  }
}

export interface PeriodicElement {
  id: number;
  name: string;
  weight: number;
  descriptions: string[];
}

const originalData = [
  { id: 1, name: 'Hydrogen', weight: 1.0079, descriptions: ['row1', 'row2'] },
  { id: 2, name: 'Helium', weight: 4.0026, descriptions: ['row1', 'row2', 'row3'] },
  { id: 3, name: 'Lithium', weight: 6.941, descriptions: ['row1', 'row2'] },
  { id: 4, name: 'Beryllium', weight: 9.0122, descriptions: ['row1', 'row2', 'row3'] },
  { id: 5, name: 'Boron', weight: 10.811, descriptions: ['row1'] },
  { id: 6, name: 'Carbon', weight: 12.0107, descriptions: ['row1', 'row2', 'row3'] },
  { id: 7, name: 'Nitrogen', weight: 14.0067, descriptions: ['row1'] },
  { id: 8, name: 'Oxygen', weight: 15.9994, descriptions: ['row1'] },
  { id: 9, name: 'Fluorine', weight: 18.9984, descriptions: ['row1', 'row2', 'row3'] },
  { id: 10, name: 'Neon', weight: 20.1797, descriptions: ['row1', 'row2', 'row3'] },
]

const DATA = originalData.reduce((current, next) => {
  next.descriptions.forEach(b => {
    current.push({ id: next.id, name: next.name, weight: next.weight, descriptions: b })
  });
  return current;
}, []);
console.log(DATA)

const ELEMENT_DATA: PeriodicElement[] = DATA;
