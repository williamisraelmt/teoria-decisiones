import {IItemData} from '../shared/models/item-data';

export class ReportTable {

  listOfData: IItemData[] = [];
  displayData: IItemData[] = [];

  currentPageDataChange($event: IItemData[]): void {
    this.displayData = $event;
  }

  generateData(): IItemData[] {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
    return data;
  }
}
